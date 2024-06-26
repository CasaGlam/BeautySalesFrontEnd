import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Swal from "sweetalert2";
import { MdEdit } from "react-icons/md";

const Clientes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("todos"); // Estado seleccionado (activo, inactivo, todos)
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://beautysalesbackend.onrender.com/api/clientes")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.clientes && Array.isArray(data.clientes)) {
          setClientes(data.clientes);
          setLoading(false);
        } else {
          console.error("Datos de clientes no encontrados en la respuesta:", data);
        }
      })
      .catch((error) => console.error("Error fetching clientes:", error));
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    if (/^[A-Za-z\s]+$/.test(value) || value === "") {
      setSearchTerm(value);
      setCurrentPage(1);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setCurrentPage(1);
  };

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAndFilteredClientes = filteredClientes.filter((cliente) =>
    filter === "activo"
      ? cliente.estado
      : filter === "inactivo"
      ? !cliente.estado
      : true // Mostrar todos
  );

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndFilteredClientes.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (clienteId) => {
    fetch(`https://beautysalesbackend.onrender.com/api/ventas`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error al consultar las ventas");
      })
      .then((ventas) => {
        const clienteAsociadoVenta = ventas.some((venta) => venta.idCliente === clienteId);

        if (clienteAsociadoVenta) {
          Swal.fire({
            icon: "error",
            title: "Cliente relacionado con una venta",
            text: "Este cliente no se puede eliminar porque está relacionado con una venta.",
          });
        } else {
          confirmDelete(clienteId);
        }
      })
      .catch((error) => {
        console.error("Error al verificar las ventas relacionadas con el cliente:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            "Hubo un problema al verificar las ventas relacionadas con el cliente. Por favor, inténtalo de nuevo más tarde.",
        });
      });
  };

  const confirmDelete = (clienteId) => {
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
        deleteCliente(clienteId);
      }
    });
  };

  const deleteCliente = (clienteId) => {
    fetch(`https://beautysalesbackend.onrender.com/api/clientes/${clienteId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          const updatedClientes = clientes.filter((cliente) => cliente._id !== clienteId);
          setClientes(updatedClientes);
          Swal.fire("¡Eliminado!", "El cliente ha sido eliminado", "success");
        } else {
          console.error("Error al eliminar el cliente:", response.statusText);
          Swal.fire("Error", "Hubo un problema al eliminar el cliente", "error");
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el cliente:", error);
        Swal.fire("Error", "Hubo un problema al eliminar el cliente", "error");
      });
  };

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 md:ml-0">
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-4 pt-4 text-texto-100">
            Listado de clientes
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
            <Link to="/clientes/registrar-cliente">
              <button className="w-full px-4 py-2 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold">
                Agregar
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-6 md:ml-0">
        <span className="text-texto-100">Filtrar por estado:</span>
        <select
          value={filter}
          onChange={handleFilterChange}
          className="px-2 py-1 rounded-lg bg-secondary-900 text-black"
        >
          <option value="todos">Todos</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>
      <div className="overflow-x-auto rounded-lg">
        {currentItems.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-500 rounded-lg">
            <thead className="bg-secondary-900 rounded-lg">
              <tr>
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
                  Correo electrónico
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
              {currentItems.map((cliente, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-black">
                    {cliente.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">
                    {cliente.telefono}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">
                    {cliente.correo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        cliente.estado
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                      disabled
                    >
                      {cliente.estado ? "Activo" : "Inactivo"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex">
                    <Link to={`/clientes/editar-cliente/${cliente._id}`}>
                      <button className="text-black border-none p-1 rounded-lg mr-2 hover:bg-black hover:text-white transition-colors">
                        <MdEdit />
                      </button>
                    </Link>
                    <button
                      className="text-black border-none p-1 rounded-lg hover:bg-black hover:text-white transition-colors"
                      onClick={() => handleDelete(cliente._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-xl text-center text-gray-500">
            No se encuentran clientes.
          </div>
        )}
      </div>
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
            { length: Math.ceil(filteredAndFilteredClientes.length / itemsPerPage) },
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
              currentPage === Math.ceil(filteredAndFilteredClientes.length / itemsPerPage)
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

export default Clientes;
