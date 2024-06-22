import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import Swal from "sweetalert2";

const Categorias = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [estadoFiltrado, setEstadoFiltrado] = useState("");

  useEffect(() => {
    fetch("https://beautysalesbackend.onrender.com/api/categorias")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.categorias && Array.isArray(data.categorias)) {
          setCategorias(data.categorias);
        } else {
          console.error(
            "Datos de categorías no encontrados en la respuesta:",
            data
          );
        }
      })
      .catch((error) => console.error("Error fetching categorías:", error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reiniciar a la primera página al buscar
  };

  const filteredCategorias = categorias.filter((categoria) => {
    const nombreMatch = categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const descripcionMatch = categoria.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const estadoMatch = (categoria.estado ? "Activo" : "Inactivo").toLowerCase().includes(searchTerm.toLowerCase());
    
    return nombreMatch || descripcionMatch || estadoMatch;
  });
  

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategorias.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
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
        fetch(`https://beautysalesbackend.onrender.com/api/categorias/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              // Filtrar las categorías para eliminar la categoría eliminada de la lista
              const updatedCategorias = categorias.filter(
                (categoria) => categoria._id !== id
              );
              setCategorias(updatedCategorias);
              Swal.fire(
                "¡Eliminado!",
                "La categoría ha sido eliminada",
                "success"
              );
            } else if (response.status === 400) {
              // 400 significa conflicto (categoría asociada a un producto)
              response.json().then((data) => {
                Swal.fire("Error", data.message, "error");
              });
            } else {
              console.error(
                "Error al eliminar la categoría:",
                response.statusText
              );
              Swal.fire(
                "Error",
                "Hubo un problema al eliminar la categoría",
                "error"
              );
            }
          })
          .catch((error) => {
            console.error("Error al eliminar la categoría:", error);
            Swal.fire(
              "Error",
              "Hubo un problema al eliminar la categoría",
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 ml-5 md:ml-0 ">
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-4 pt-4 text-texto-100">
            Listado de categorías
          </h1>
        </div>
        <div className="flex gap-4 justify-end w-[60%]">
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
            <Link to="/categorias/registrar-categoria">
              <button className="w-full px-4 py-2 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold">
                Agregar
              </button>
            </Link>
          </div>
        </div>
      </div>
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
          <option value="Activo">Activas</option>
          <option value="Inactivo">Inactivas</option>
         
        </select>
      </div>
      {filteredCategorias.length === 0 ? (
        <div className="text-xl text-center text-gray-500">
          No se encuentran categorías.
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
                    Nombre
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
                {currentItems.map((categoria) => (
                  <tr key={categoria._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-black">
                      {categoria.nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-black">
                      {categoria.descripcion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          categoria.estado
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                        disabled
                      >
                        {categoria.estado ? "Activo" : "Inactivo"}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex">
                      <Link to={`/categorias/editar-categoria/${categoria._id}`}>
                        <button className="text-black border-none p-1 rounded-lg mr-2 hover:bg-black hover:text-white transition-colors">
                          <MdEdit />
                        </button>
                      </Link>
                      <button
                        className="text-black border-none p-1 rounded-lg hover:bg-black hover:text-white transition-colors"
                        onClick={() => handleDelete(categoria._id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                { length: Math.ceil(filteredCategorias.length / itemsPerPage) },
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
                  Math.ceil(filteredCategorias.length / itemsPerPage)
                }
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <IoIosArrowForward />
              </button>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default Categorias;
