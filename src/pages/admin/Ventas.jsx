import React, { useState, useEffect } from "react";
import { FaSearch, FaAngleDown, FaAngleUp, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


// Icons
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { MdEdit } from "react-icons/md";

const Ventas = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [ventaEditando, setVentaEditando] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [ventaExpandida, setVentaExpandida] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [estadoFiltrado, setEstadoFiltrado] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/ventas")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setVentas(data);
        } else {
          console.error(
            "Datos de ventas no encontrados en la respuesta:",
            data
          );
        }
      })
      .catch((error) => console.error("Error fetching ventas:", error));

    fetch("http://localhost:8080/api/clientes")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.clientes)) {
          setClientes(data.clientes);
        } else {
          console.error(
            "Datos de clientes no encontrados en la respuesta:",
            data
          );
        }
      })
      .catch((error) => console.error("Error fetching clientes:", error));

    fetch("http://localhost:8080/api/productos")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.productos)) {
          setProductos(data.productos);
        } else {
          console.error(
            "Datos de productos no encontrados en la respuesta:",
            data
          );
        }
      })
      .catch((error) => console.error("Error fetching productos:", error));
  }, []);

  const toggleModal = () => {
    setMostrarModal(!mostrarModal);
  };

  const abrirModalEdicion = (venta) => {
    setVentaEditando(venta);
    setDescripcion(venta.descripcionEstado || "");
    setMostrarModal(true);
  };
  const handleDescargarReporte = () => {
    // Preparar los datos para el archivo Excel
    const ventasData = filteredVentas.map(venta => ({
      'Número de Venta': venta.numeroVenta,
      'Fecha': new Date(venta.fecha).toLocaleDateString(),
      'Estado': venta.estado ? 'Activa' : 'Inactiva',
      'Cliente': getClienteName(venta.idCliente),
      'Total': getTotalVentaTabla(venta)
    }));
  
    // Calcular el total de todos los totales
    const totalGeneral = ventasData.reduce((total, venta) => total + venta['Total'], 0);
  
    // Añadir una fila para el total general al final de los datos
    ventasData.push({
      'Número de Venta': '',
      'Fecha': '',
      'Estado': '',
      'Cliente': 'Total General:',
      'Total': totalGeneral
    });
  
    const worksheet = XLSX.utils.json_to_sheet(ventasData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ventas');
  
    // Generar el archivo Excel y descargar
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(excelBlob, 'reporte_ventas.xlsx');
  };
  
  



  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const estado = formData.get("estado") === "true";
    const updatedVenta = { ...ventaEditando, estado };
    updatedVenta.descripcionEstado = descripcion; // Actualizando la descripción del estado
    fetch(`http://localhost:8080/api/ventas/${ventaEditando._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedVenta),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Venta actualizada con éxito:", data);
        // Actualizar el estado local de ventas
        const updatedVentas = ventas.map((venta) =>
          venta._id === updatedVenta._id ? updatedVenta : venta
        );
        setVentas(updatedVentas);
        setMostrarModal(false);
        setVentaEditando(null);
        setDescripcion("");
        // Mostrar Sweet Alert de éxito
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "La descripción del estado ha sido actualizada.",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });
      })
      .catch((error) => console.error("Error al actualizar la venta:", error));
  };

  const handleCancel = () => {
    setMostrarModal(false);
    setVentaEditando(null);
    setDescripcion("");
  };

  const toggleVentaExpandida = (id) => {
    if (ventaExpandida === id) {
      setVentaExpandida(null);
    } else {
      setVentaExpandida(id);
    }
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value.toLowerCase());
    setCurrentPage(1);
  };
  

  const getClienteName = (idCliente) => {
    const cliente = clientes.find((cliente) => cliente._id === idCliente);
    return cliente ? cliente.nombre : "Cliente no encontrado";
  };

  const getProductName = (idProducto) => {
    const producto = productos.find((producto) => producto._id === idProducto);
    return producto ? producto.nombre : "Producto no encontrado";
  };

  const getDescription = (idProducto) => {
    const producto = productos.find((producto) => producto._id === idProducto);
    return producto ? producto.descripcion : "Descripción no encontrada";
  };

  const getTotalVenta = (venta) => {
    return venta.detallesVenta.reduce(
      (total, detalle) => total + detalle.total,
      0
    );
  };

  const getTotalDetalle = (detalle) => {
    return detalle.cantidad * detalle.precio;
  };

  const getTotalVentaTabla = (venta) => {
    return venta.detallesVenta.reduce(
      (total, detalle) => total + getTotalDetalle(detalle),
      0
    );
  };

  const filteredVentas = ventas.filter((venta) => {
    const totalVenta = getTotalVentaTabla(venta).toString().toLowerCase();
    const estadoFiltradoMatches =
      estadoFiltrado === "" || // Si el filtro está vacío, coincidimos con todas las ventas
      (estadoFiltrado === "Activa" && venta.estado) || // Coincidimos con ventas activas
      (estadoFiltrado === "Inactiva" && !venta.estado); // Coincidimos con ventas inactivas
  
    return (
      estadoFiltradoMatches && // Añadimos esta condición al filtrado
      (venta.numeroVenta.toString().toLowerCase().includes(searchTerm) ||
        new Date(venta.fecha).toLocaleDateString().toLowerCase().includes(searchTerm) ||
        (venta.estado ? "activa" : "inactiva").toLowerCase().includes(searchTerm) ||
        getClienteName(venta.idCliente).toLowerCase().includes(searchTerm) ||
        totalVenta.includes(searchTerm)) // Aquí se filtra por el campo total
    );
  });
  
  
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVentas.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 ml-5 md:ml-0">
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-4 pt-4 text-texto-100">
            Listado de ventas
          </h1>
        </div>
        <div className="flex flex-col justify-end gap-4 w-full ml-5 md:ml-0 md:flex-row md:w-[60%]">
          <div className="md:w-[80%]">
            <input
              className="w-full px-2 py-2 rounded-lg pl-4 placeholder-black text-black bg-secondary-900"
              type="search"
              placeholder="Buscar"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-4">
            <div>
              <Link to="/ventas/registrar-venta">
                <button className="w-full px-4 py-2 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold">
                  Agregar
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between mb-4">
      <div className="flex items-center gap-4 mb-6 ml-5 md:ml-0">
        <span className="text-texto-100">Filtrar por estado:</span>
        <select
  name="estadoFiltrado"
  id="estadoFiltrado"
  className="px-2 py-1 rounded-lg bg-secondary-900 text-black"
  value={estadoFiltrado}
  onChange={(e) => setEstadoFiltrado(e.target.value)}
>
  <option value="">Todas</option>
  <option value="Activa">Activas</option>
  <option value="Inactiva">Inactivas</option>
</select>

      </div>
      <div>
  <button
    onClick={handleDescargarReporte}
    className="bg-green-400 px-4 py-2 rounded-xl flex gap-2 justify-center items-center"
  >
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 48 48">
<rect width="16" height="9" x="28" y="15" fill="#21a366"></rect><path fill="#185c37" d="M44,24H12v16c0,1.105,0.895,2,2,2h28c1.105,0,2-0.895,2-2V24z"></path><rect width="16" height="9" x="28" y="24" fill="#107c42"></rect><rect width="16" height="9" x="12" y="15" fill="#3fa071"></rect><path fill="#33c481" d="M42,6H28v9h16V8C44,6.895,43.105,6,42,6z"></path><path fill="#21a366" d="M14,6h14v9H12V8C12,6.895,12.895,6,14,6z"></path><path d="M22.319,13H12v24h10.319C24.352,37,26,35.352,26,33.319V16.681C26,14.648,24.352,13,22.319,13z" opacity=".05"></path><path d="M22.213,36H12V13.333h10.213c1.724,0,3.121,1.397,3.121,3.121v16.425	C25.333,34.603,23.936,36,22.213,36z" opacity=".07"></path><path d="M22.106,35H12V13.667h10.106c1.414,0,2.56,1.146,2.56,2.56V32.44C24.667,33.854,23.52,35,22.106,35z" opacity=".09"></path><linearGradient id="flEJnwg7q~uKUdkX0KCyBa_UECmBSgBOvPT_gr1" x1="4.725" x2="23.055" y1="14.725" y2="33.055" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#18884f"></stop><stop offset="1" stop-color="#0b6731"></stop></linearGradient><path fill="url(#flEJnwg7q~uKUdkX0KCyBa_UECmBSgBOvPT_gr1)" d="M22,34H6c-1.105,0-2-0.895-2-2V16c0-1.105,0.895-2,2-2h16c1.105,0,2,0.895,2,2v16	C24,33.105,23.105,34,22,34z"></path><path fill="#fff" d="M9.807,19h2.386l1.936,3.754L16.175,19h2.229l-3.071,5l3.141,5h-2.351l-2.11-3.93L11.912,29H9.526	l3.193-5.018L9.807,19z"></path>
</svg>
    <span className="text-white font-bold">Descargar reporte</span>
  </button>
</div>

      </div>

      {filteredVentas.length === 0 ? (
        <div className="text-center text-xl text-gray-500 py-10">
          No se encontraron ventas.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full divide-y divide-gray-500 rounded-lg">
              <thead className="bg-secondary-900 rounded-lg">
                <tr className="">
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider"
                  >
                    Número de Venta
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider"
                  >
                    Fecha
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider"
                  >
                    Estado
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider"
                  >
                    Cliente
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider"
                  >
                    Total
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Mostrar Detalles</span>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Mostrar Detalles</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-300 divide-y divide-black rounded-lg">
                {currentItems.map((venta) => (
                  <React.Fragment key={venta._id}>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-black">
                          {venta.numeroVenta}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-black">
                          {new Date(venta.fecha).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            venta.estado
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {venta.estado ? "Activa" : "Inactiva"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-black">
                        {getClienteName(venta.idCliente)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-black">
                        ${getTotalVentaTabla(venta)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => abrirModalEdicion(venta)}
                          className="text-black border-none p-1 rounded-lg mr-2 hover:bg-black hover:text-white transition-colors"
                        >
                          <MdEdit />
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => toggleVentaExpandida(venta._id)}
                          className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                        >
                          {ventaExpandida === venta._id ? (
                            <FaAngleUp />
                          ) : (
                            <FaAngleDown />
                          )}
                        </button>
                      </td>
                    </tr>
                    {ventaExpandida === venta._id && (
                      <tr>
                        <td colSpan="7">
                          <div className="mt-4 mb-2 px-8">
                            <ul className="border border-gray-400 rounded-md divide-y divide-gray-500">
                              <li className="px-4 py-2 bg-secondary-900 flex items-center justify-between text-sm font-medium">
                                <span className="text-texto-100">Producto</span>
                                <span className="text-texto-100">
                                  Precio unitario
                                </span>
                                <span className="text-texto-100">Cantidad</span>
                                <span className="text-texto-100">Total</span>
                              </li>
                              {venta.detallesVenta.map((detalle) => (
                                <li
                                  key={detalle._id}
                                  className="px-4 py-4 flex items-center justify-between text-sm"
                                >
                                  <span className="text-black">
                                    {getProductName(detalle.idProducto)}
                                  </span>
                                  <span className="text-black">
                                    ${detalle.precio}
                                  </span>
                                  <span className="text-black">
                                    {detalle.cantidad}
                                  </span>
                                  <span className="text-black">
                                    ${getTotalDetalle(detalle)}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4 mb-4">
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <GoChevronLeft />
              </button>
              {[
                ...Array(Math.ceil(filteredVentas.length / itemsPerPage)).keys(),
              ].map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number + 1)}
                  className={
                    currentPage === number + 1
                      ? "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary text-sm font-medium text-white hover:bg-opacity-[80%]"
                      : "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  }
                >
                  {number + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(filteredVentas.length / itemsPerPage)
                }
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <GoChevronRight />
              </button>
            </nav>
          </div>
        </>
      )}
      {mostrarModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleEditSubmit}>
                <div className="p-6">
                  <label
                    htmlFor="estado"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Estado:
                  </label>
                  <select
                    name="estado"
                    id="estado"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full text-texto-100"
                    defaultValue={
                      ventaEditando ? ventaEditando.estado.toString() : ""
                    }
                  >
                    <option value="true">Activa</option>
                    <option value="false">Inactiva</option>
                    
                  </select>
                </div>
                <div className="p-6">
                  <label
                    htmlFor="descripcionEstado"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Descripción de estado:
                  </label>
                  <textarea
                    name="descripcion"
                    id="descripcionEstado"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black resize-none"
                    rows="3"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  ></textarea>
                </div>
                <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-opacity-[80%] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Guardar Cambios
                  </button>
                  <button
                    onClick={handleCancel}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ventas;


