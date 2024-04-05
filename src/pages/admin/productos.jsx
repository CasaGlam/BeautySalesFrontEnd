import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importar Link desde react-router-dom
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const Productos = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [productos] = useState([
    { idProducto: 1, nombre: "Producto Uno", precio: 10.99, cantidad: 50, descripcion: "Descripción del producto uno", estado: true },
    { idProducto: 2, nombre: "Producto Dos", precio: 20.99, cantidad: 30, descripcion: "Descripción del producto dos", estado: false },
    { idProducto: 3, nombre: "Producto Tres", precio: 15.99, cantidad: 40, descripcion: "Descripción del producto tres", estado: true },
    { idProducto: 4, nombre: "Producto Cuatro", precio: 25.99, cantidad: 20, descripcion: "Descripción del producto cuatro", estado: false },
    { idProducto: 5, nombre: "Producto Cinco", precio: 30.99, cantidad: 60, descripcion: "Descripción del producto cinco", estado: true },
    { idProducto: 6, nombre: "Producto Seis", precio: 12.99, cantidad: 35, descripcion: "Descripción del producto seis", estado: true },
    { idProducto: 7, nombre: "Producto Siete", precio: 18.99, cantidad: 45, descripcion: "Descripción del producto siete", estado: false }
  ]);
  const itemsPerPage = 5;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Resetear a la primera página al buscar
  };

  const filteredProductos = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProductos.slice(indexOfFirstItem, indexOfLastItem);

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
        // Aquí puedes agregar la lógica para eliminar el producto con el id proporcionado
        Swal.fire(
          '¡Eliminado!',
          'El producto ha sido eliminado',
          'success'
        );
      }
    });
  };

  return (
    <div className="flex justify-center">
      <div className='bg-secondary-100 w-full rounded-lg'>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6  p-8">
          <div>
            <h1 className="text-2xl font-bold mb-4 pt-4">Registro de productos</h1>
          </div>
          <div className="flex gap-4">
            <div>
              <input
                className="w-full px-2 py-2 rounded-lg pl-4 placeholder-black text-black"
                type="search"
                placeholder="Buscar producto"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="">
              <Link to="/productos/registrar-producto"> {/* Enlace para agregar nuevo producto */}
                <button className="w-full px-4 py-2 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold">
                  Agregar nuevo producto
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
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Precio
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Cantidad
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
              {currentItems.map((producto) => (
                <tr key={producto.idProducto}>
                  <td className="px-6 py-4 whitespace-nowrap text-black">{producto.idProducto}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">{producto.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">{producto.precio}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">{producto.cantidad}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">{producto.descripcion}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">{producto.estado ? 'Activo' : 'Inactivo'}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex">
                    <Link to={`/productos/editar-producto`}> {/* Enlace para editar producto */}
                      <FaEdit className="text-blue-500 hover:text-blue-700 transition-colors mr-2 cursor-pointer" />
                    </Link>
                    <FaTrash className="text-red-500 hover:text-red-700 transition-colors cursor-pointer" onClick={() => handleDelete(producto.idProducto)} />
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
              <span className="sr-only">Previous</span>
              {/* Heroicon name: solid/chevron-left */}
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M13.707 4.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L10 8.086l3.293-3.293a1 1 0 0 1 1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            {/* Otras páginas */}
            {/* El contenido aquí depende de la cantidad de páginas */}
            {[...Array(Math.ceil(filteredProductos.length / itemsPerPage)).keys()].map((number) => (
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
              disabled={currentPage === Math.ceil(filteredProductos.length / itemsPerPage)}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              {/* Heroicon name: solid/chevron-right */}
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M6.293 15.707a1 1 0 0 1-1.414-1.414L10 10.914l-3.293-3.293a1 1 0 1 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Productos;
