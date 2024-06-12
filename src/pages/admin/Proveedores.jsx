import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Swal from "sweetalert2";
import { MdEdit } from "react-icons/md";

const Proveedores = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("todos"); // Estado para el filtro de activo/inactivo/todos
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/proveedores")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.proveedores && Array.isArray(data.proveedores)) {
          setProveedores(data.proveedores);
        } else {
          console.error(
            "Datos de proveedores no encontrados en la respuesta:",
            data
          );
        }
      })
      .catch((error) => console.error("Error fetching proveedores:", error));
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    // Validar que el valor ingresado contenga solo letras
    if (/^[A-Za-z\s-1234567890.]+$/.test(value) || value === "") {
      setSearchTerm(value);
      setCurrentPage(1); // Resetear a la primera página al buscar
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setCurrentPage(1); // Resetear a la primera página al cambiar el filtro
  };

  const filteredProveedores = proveedores.filter((proveedor) => {
    // Filtrar por nombre
    const nombreIncludes = proveedor.nombre
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Filtrar por estado
    if (filter === "todos") {
      return nombreIncludes;
    } else {
      return proveedor.estado === (filter === "activo");
    }
  });

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProveedores.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    // Consultar la API de compras para verificar si el proveedor está relacionado con alguna compra
    fetch("http://localhost:8080/api/compras")
      .then((response) => response.json())
      .then((data) => {
        // Filtrar las compras para encontrar alguna que tenga el mismo ID de proveedor que estamos intentando eliminar
        const comprasRelacionadas = data.filter(
          (compra) => compra.idProveedor === id
        );
        if (comprasRelacionadas.length > 0) {
          // Si hay compras relacionadas, mostrar una alerta y evitar la eliminación
          Swal.fire({
            icon: "error",
            title: "Proveedor relacionado con una compra",
            text:
              "Este proveedor no se puede eliminar porque está relacionado con una compra.",
          });
        } else {
          // Si no hay compras relacionadas, proceder con la eliminación del proveedor
          confirmDelete(id);
        }
      })
      .catch((error) => {
        console.error(
          "Error al verificar las compras relacionadas con el proveedor:",
          error
        );
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            "Hubo un problema al verificar las compras relacionadas con el proveedor. Por favor, inténtalo de nuevo más tarde.",
        });
      });
  };

  const confirmDelete = (id) => {
    // Mostrar la confirmación de eliminación solo si no hay compras relacionadas con el proveedor
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás deshacer esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Si se confirma la eliminación, realizar la solicitud de eliminación del proveedor
        deleteProveedor(id);
      }
    });
  };

  const deleteProveedor = (id) => {
    fetch(`http://localhost:8080/api/proveedores/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Si la eliminación es exitosa, actualizar la lista de proveedores
          const updatedProveedores = proveedores.filter(
            (proveedor) => proveedor._id !== id
          );
          setProveedores(updatedProveedores);
          Swal.fire(
            "¡Eliminado!",
            "El proveedor ha sido eliminado",
            "success"
          );
        } else {
          console.error(
            "Error al eliminar el proveedor:",
            response.statusText
          );
          Swal.fire(
            "Error",
            "Hubo un problema al eliminar el proveedor",
            "error"
          );
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el proveedor:", error);
        Swal.fire(
          "Error",
          "Hubo un problema al eliminar el proveedor",
          "error"
        );
      });
  };

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 md:ml-0 ">
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-4 pt-4 text-texto-100 ">
            Listado de proveedores
          </h1>
        </div>
        <div className="flex flex-col justify-end gap-4 w-full  md:ml-0 md:flex-row md:w-[60%]">
          <div className="md:w-[80%]">
            <input
              className="w-full px-2 py-2 rounded-lg pl-4 placeholder-black text-black bg-secondary-900"
              type="search"
              placeholder="Buscar"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="">
            <Link to="/proveedores/registrar-proveedor">
              <button className="w-full px-4 py-2 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold">
                Agregar
              </button>
            </Link>
          </div>
         
          </div>
        </div>
        <div className="flex items-center gap-4 mb-6  md:ml-0">
        <span className="text-texto-100">Filtrar por estado:</span>
        <select
          value={filter}
          onChange={handleFilterChange}
          className="px-2 py-1 rounded-lg bg-secondary-900 text-black"
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
          
        </select>
      </div>
        {filteredProveedores.length === 0 ? (
          <div className="text-xl text-center text-gray-500">
            No se encuentran proveedores.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full divide-y divide-gray-500 rounded-lg">
              <thead className="bg-secondary-900 rounded-lg">
                <tr className="">
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider"
                  >
                    Nombre
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider"
                  >
                    Teléfono
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider"
                  >
                    Correo
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider"
                  >
                    Dirección
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider"
                  >
                    Descripción
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
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-300 divide-y divide-black rounded-lg">
                {currentItems.map((proveedor, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-black">
                      {proveedor.nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-black">
                      {proveedor.telefono}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-black">
                      {proveedor.correo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-black">
                      {proveedor.direccion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-black">
                      {proveedor.descripcion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          proveedor.estado
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                        disabled
                      >
                        {proveedor.estado ? "Activo" : "Inactivo"}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/proveedores/editar-proveedor/${proveedor._id}`}>
                        <button className="text-black border-none p-1 rounded-lg mr-2 hover:bg-black hover:text-white transition-colors">
                          <MdEdit />
                        </button>
                      </Link>
                      <button
                        className="text-black border-none p-1 rounded-lg hover:bg-black hover:text-white transition-colors"
                        onClick={() => handleDelete(proveedor._id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Paginación */}
        <div className="flex justify-center my-4">
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <IoIosArrowBack />
            </button>
            {Array.from(
              { length: Math.ceil(filteredProveedores.length / itemsPerPage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`${
                    currentPage === i + 1
                      ? "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary text-sm font-medium text-white hover:bg-opacity-[80%]"
                      : "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(filteredProveedores.length / itemsPerPage)
              }
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <IoIosArrowForward />
            </button>
          </nav>
        </div>
      </div>
    );
  };
  
  export default Proveedores;
  