import React, { useState, useEffect } from 'react';
import { FaSearch, FaAngleDown, FaAngleUp, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const Ventas = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [ventaEditando, setVentaEditando] = useState(null); 
  const [descripcion, setDescripcion] = useState(''); 
  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [ventaExpandida, setVentaExpandida] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch('http://localhost:8080/api/ventas')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setVentas(data);
        } else {
          console.error('Datos de ventas no encontrados en la respuesta:', data);
        }
      })
      .catch(error => console.error('Error fetching ventas:', error));

    fetch('http://localhost:8080/api/clientes')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.clientes)) {
          setClientes(data.clientes);
        } else {
          console.error('Datos de clientes no encontrados en la respuesta:', data);
        }
      })
      .catch(error => console.error('Error fetching clientes:', error));

    fetch('http://localhost:8080/api/productos')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.productos)) {
          setProductos(data.productos);
        } else {
          console.error('Datos de productos no encontrados en la respuesta:', data);
        }
      })
      .catch(error => console.error('Error fetching productos:', error));
  }, []);

  const toggleModal = () => {
    setMostrarModal(!mostrarModal);
  };

  const abrirModalEdicion = (venta) => {
    setVentaEditando(venta);
    setDescripcion(venta.descripcionEstado || ''); 
    setMostrarModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const estado = formData.get('estado') === 'true';
    const updatedVenta = { ...ventaEditando, estado }; 
    updatedVenta.descripcionEstado = descripcion; // Actualizando la descripción del estado
    fetch(`http://localhost:8080/api/ventas/${ventaEditando._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedVenta)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Venta actualizada con éxito:', data);
      // Actualizar el estado local de ventas
      const updatedVentas = ventas.map(venta => venta._id === updatedVenta._id ? updatedVenta : venta);
      setVentas(updatedVentas);
      setMostrarModal(false);
      setVentaEditando(null);
      setDescripcion(''); 
      // Mostrar Sweet Alert de éxito
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'La descripción del estado ha sido actualizada.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      });
    })
    .catch(error => console.error('Error al actualizar la venta:', error));
  };

  const handleCancel = () => {
    setMostrarModal(false);
    setVentaEditando(null);
    setDescripcion(''); 
  };

  const toggleVentaExpandida = (id) => {
    if (ventaExpandida === id) {
      setVentaExpandida(null);
    } else {
      setVentaExpandida(id);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const getClienteName = (idCliente) => {
    const cliente = clientes.find(cliente => cliente._id === idCliente);
    return cliente ? cliente.nombre : 'Cliente no encontrado';
  };

  const getProductName = (idProducto) => {
    const producto = productos.find(producto => producto._id === idProducto);
    return producto ? producto.nombre : 'Producto no encontrado';
  };

  const getDescription = (idProducto) => {
    const producto = productos.find(producto => producto._id === idProducto);
    return producto ? producto.descripcion : 'Descripción no encontrada';
  };

  const getTotalVenta = (venta) => {
    return venta.detallesVenta.reduce((total, detalle) => total + detalle.total, 0);
  };

  const getTotalDetalle = (detalle) => {
    return detalle.cantidad * detalle.precio;
  };

  const getTotalVentaTabla = (venta) => {
    return venta.detallesVenta.reduce((total, detalle) => total + getTotalDetalle(detalle), 0);
  };

  const filteredVentas = ventas.filter((venta) =>
    venta.numeroVenta.toString().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVentas.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex justify-center">
      <div className='bg-secondary-100 w-full rounded-lg'>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6  p-8">
          <div>
            <h1 className="text-2xl font-bold mb-4 pt-4">Registro de ventas</h1>
          </div>
          <div className="flex gap-4">
            <div>
              <input
                className="w-full px-2 py-2 rounded-lg pl-4 placeholder-black text-black"
                type="search"
                placeholder="Buscar venta"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="">
              <Link to="/ventas/registrar-venta">
                <button className="w-full px-4 py-2 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold">
                  Agregar nueva venta
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className='p-5 overflow-x-auto rounded-lg'>
          <table className="min-w-full divide-y divide-gray-500 rounded-lg">
            <thead className="bg-secondary-900 rounded-lg">
              <tr className=''>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Número de Venta
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Editar</span>
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
                      <div className="font-medium text-black">{venta.numeroVenta}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-black">{new Date(venta.fecha).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${venta.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {venta.estado ? 'Activa' : 'Inactiva'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-black">{getClienteName(venta.idCliente)}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-black">
                      ${getTotalVentaTabla(venta)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => abrirModalEdicion(venta)} className="text-indigo-600 hover:text-indigo-900 focus:outline-none">
                        <FaEdit />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => toggleVentaExpandida(venta._id)} className="text-indigo-600 hover:text-indigo-900 focus:outline-none">
                        {ventaExpandida === venta._id ? <FaAngleUp /> : <FaAngleDown />}
                      </button>
                    </td>
                  </tr>
                  {ventaExpandida === venta._id && (
                    <tr>
                      <td colSpan="7">
                        <div className="mt-4 mb-2 px-8">
                          <ul className="border border-gray-400 rounded-md divide-y divide-gray-500">
                            <li className="px-4 py-2 bg-secondary-900 flex items-center justify-between text-sm font-medium">
                              <span>Producto</span>
                              <span>Precio unitario</span>
                              <span>Cantidad</span>
                              <span>Total</span>
                            </li>
                            {venta.detallesVenta.map((detalle) => (
                              <li key={detalle._id} className="px-4 py-4 flex items-center justify-between text-sm">
                                <span className="text-black">{getProductName(detalle.idProducto)}</span>
                                <span className="text-black">${detalle.precio}</span>
                                <span className="text-black">{detalle.cantidad}</span>
                                <span className="text-black">${getTotalDetalle(detalle)}</span>
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
        <div className="flex justify-center mt-4">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M13.707 4.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L10 8.086l3.293-3.293a1 1 0 0 1 1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            {[...Array(Math.ceil(filteredVentas.length / itemsPerPage)).keys()].map((number) => (
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
              disabled={currentPage === Math.ceil(filteredVentas.length / itemsPerPage)}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M6.293 15.707a1 1 0 0 1-1.414-1.414L10 10.914l-3.293-3.293a1 1 0 1 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
      {mostrarModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleEditSubmit}>
                <div className="p-6">
                  <label htmlFor="estado" className="block text-sm font-medium text-gray-700">Estado:</label>
                  <select name="estado" id="estado" className="mt-1 p-2 border border-gray-300 rounded-md w-full" defaultValue={ventaEditando ? ventaEditando.estado.toString() : ''}>
                    <option value="true">Activa</option>
                    <option value="false">Inactiva</option>
                  </select>
                </div>
                <div className="p-6">
                  <label htmlFor="descripcionEstado" className="block text-sm font-medium text-gray-700">Descripción de estado:</label>
                  <textarea
                    name="descripcion"
                    id="descripcionEstado"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black" // Cambio de color de texto a negro
                    rows="3"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  ></textarea>
                </div>
                <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-opacity-[80%] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm">
                    Guardar cambios
                  </button>
                  <button onClick={handleCancel} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
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
