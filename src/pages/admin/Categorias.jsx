import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Categorias = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [categorias, setCategorias] = useState([
    { id: 1, nombre: "Categoría Uno", descripcion: "Descripción de la categoría uno", estado: true },
    { id: 2, nombre: "Categoría Dos", descripcion: "Descripción de la categoría dos", estado: false },
    { id: 3, nombre: "Categoría Tres", descripcion: "Descripción de la categoría tres", estado: true },
    { id: 4, nombre: "Categoría Cuatro", descripcion: "Descripción de la categoría cuatro", estado: false },
    { id: 5, nombre: "Categoría Cinco", descripcion: "Descripción de la categoría cinco", estado: true },
    { id: 6, nombre: "Categoría Seis", descripcion: "Descripción de la categoría seis", estado: true },
    { id: 7, nombre: "Categoría Siete", descripcion: "Descripción de la categoría siete", estado: false }
  ]);
  const itemsPerPage = 5;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Resetear a la primera página al buscar
  };

  const filteredCategorias = categorias.filter((categoria) =>
    categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategorias.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás deshacer esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCategorias = categorias.filter((categoria) => categoria.id !== id);
        setCategorias(updatedCategorias);
        Swal.fire(
          '¡Eliminado!',
          'La categoría ha sido eliminada',
          'success'
        );
      }
    });
  };

  const toggleEstado = (id) => {
    const updatedCategorias = categorias.map((categoria) =>
      categoria.id === id ? { ...categoria, estado: !categoria.estado } : categoria
    );
    setCategorias(updatedCategorias);
  };

  return (
    <div className="flex justify-center">
      <div className='bg-secondary-100 w-full rounded-lg'>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6  p-8">
          <div>
            <h1 className="text-2xl font-bold mb-4 pt-4">Registro de categorías</h1>
          </div>
          <div className="flex gap-4">
            <div>
              <input
                className="w-full px-2 py-2 rounded-lg pl-4 placeholder-black text-black"
                type="search"
                placeholder="Buscar categoría"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="">
              <Link to="/categorias/registrar-categoria">
                <button className="w-full px-4 py-2 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold">
                  Agregar nueva categoría
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
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Descripción
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-300 divide-y divide-black rounded-lg">
              {currentItems.map((categoria, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-black">{categoria.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">{categoria.descripcion}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${categoria.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                      onClick={() => toggleEstado(categoria.id)}
                    >
                      {categoria.estado ? 'Activo' : 'Inactivo'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex">
                    <Link to={`/categorias/editar-categoria`}>
                      <FaEdit className="text-black hover:text-blue-700 transition-colors mr-2 cursor-pointer" />
                    </Link>
                    <FaTrash className="text-black hover:text-red-700 transition-colors cursor-pointer" onClick={() => handleDelete(categoria.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Paginación */}
        <div className="flex justify-center mt-4">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <IoIosArrowBack/>
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
              disabled={currentPage === Math.ceil(filteredCategorias.length / itemsPerPage)}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <IoIosArrowForward/>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Categorias;
