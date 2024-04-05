import React, { useState } from 'react';
import { FaSearch, FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Compras = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [compras, setCompras] = useState([
    {
      id: 1,
      numeroCompra: 'ABCDE12345',
      descripcion: 'Compra de productos electrónicos',
      fecha: '2024-04-03',
      estado: true,
      proveedor: 'Proveedor Uno',
      total: 0,
      productosSeleccionados: [
        { id: 1, nombre: 'Producto 1', precio: 500, cantidad: 2, subtotal: 1000 },
        { id: 2, nombre: 'Producto 2', precio: 300, cantidad: 1, subtotal: 300 }
      ]
    },
    {
      id: 2,
      numeroCompra: 'FGHIJ67890',
      descripcion: 'Compra de ropa',
      fecha: '2024-04-05',
      estado: false,
      proveedor: 'Proveedor Dos',
      total: 0,
      productosSeleccionados: [
        { id: 1, nombre: 'Producto 3', precio: 200, cantidad: 3, subtotal: 600 },
        { id: 2, nombre: 'Producto 4', precio: 150, cantidad: 2, subtotal: 300 }
      ]
    },
    // Agrega aquí los demás registros de compras
    {
      id: 3,
      numeroCompra: 'KLMNO54321',
      descripcion: 'Compra de muebles',
      fecha: '2024-04-08',
      estado: true,
      proveedor: 'Proveedor Tres',
      total: 0,
      productosSeleccionados: [
        { id: 1, nombre: 'Mesa', precio: 700, cantidad: 1, subtotal: 700 },
        { id: 2, nombre: 'Silla', precio: 150, cantidad: 4, subtotal: 600 }
      ]
    },
    {
      id: 4,
      numeroCompra: 'PQRST67890',
      descripcion: 'Compra de libros',
      fecha: '2024-04-10',
      estado: false,
      proveedor: 'Proveedor Cuatro',
      total: 0,
      productosSeleccionados: [
        { id: 1, nombre: 'Libro 1', precio: 20, cantidad: 5, subtotal: 100 },
        { id: 2, nombre: 'Libro 2', precio: 25, cantidad: 3, subtotal: 75 }
      ]
    },
    {
      id: 5,
      numeroCompra: 'UVWXY09876',
      descripcion: 'Compra de juguetes',
      fecha: '2024-04-15',
      estado: true,
      proveedor: 'Proveedor Cinco',
      total: 0,
      productosSeleccionados: [
        { id: 1, nombre: 'Muñeca', precio: 30, cantidad: 2, subtotal: 60 },
        { id: 2, nombre: 'Carro de control remoto', precio: 50, cantidad: 1, subtotal: 50 }
      ]
    },
    {
      id: 6,
      numeroCompra: 'ZABCDE54321',
      descripcion: 'Compra de herramientas',
      fecha: '2024-04-18',
      estado: true,
      proveedor: 'Proveedor Seis',
      total: 0,
      productosSeleccionados: [
        { id: 1, nombre: 'Martillo', precio: 15, cantidad: 3, subtotal: 45 },
        { id: 2, nombre: 'Destornillador', precio: 10, cantidad: 5, subtotal: 50 }
      ]
    },
    {
      id: 7,
      numeroCompra: 'FGHIJ12345',
      descripcion: 'Compra de electrodomésticos',
      fecha: '2024-04-22',
      estado: false,
      proveedor: 'Proveedor Siete',
      total: 0,
      productosSeleccionados: [
        { id: 1, nombre: 'Licuadora', precio: 40, cantidad: 1, subtotal: 40 },
        { id: 2, nombre: 'Tostadora', precio: 30, cantidad: 1, subtotal: 30 }
      ]
    },
  ]);
  const [compraExpandida, setCompraExpandida] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const toggleModal = () => {
    setMostrarModal(!mostrarModal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para guardar la compra
    setMostrarModal(false);
  };

  const handleCancel = () => {
    // Lógica para cancelar la compra
    setMostrarModal(false);
  };

  const toggleCompraExpandida = (id) => {
    if (compraExpandida === id) {
      setCompraExpandida(null);
    } else {
      setCompraExpandida(id);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Resetear a la primera página al buscar
  };

  const filteredCompras = compras.filter((compra) =>
    compra.numeroCompra.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCompras.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex justify-center">
      <div className='bg-secondary-100 w-full rounded-lg'>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6  p-8">
          <div>
            <h1 className="text-2xl font-bold mb-4 pt-4">Registro de compras</h1>
          </div>
          <div className="flex gap-4">
            <div>
              <input
                className="w-full px-2 py-2 rounded-lg pl-4 placeholder-black text-black"
                type="search"
                placeholder="Buscar compra"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="">
              <Link to="/compras/registrar-compra">
                <button className="w-full px-4 py-2 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold">
                  Agregar nueva compra
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
                  Número de Compra
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Descripción
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Proveedor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Mostrar Detalles</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-300 divide-y divide-black rounded-lg">
              {currentItems.map((compra) => (
                <React.Fragment key={compra.id}>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-black">{compra.numeroCompra}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-black">{compra.descripcion}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-black">{compra.fecha}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${compra.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {compra.estado ? 'Activa' : 'Inactiva'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-black">{compra.proveedor}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-black">
                      ${compra.productosSeleccionados.reduce((total, producto) => total + producto.subtotal, 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => toggleCompraExpandida(compra.id)} className="text-indigo-600 hover:text-indigo-900 focus:outline-none">
                        {compraExpandida === compra.id ? <FaAngleUp /> : <FaAngleDown />}
                      </button>
                    </td>
                  </tr>
                  {compraExpandida === compra.id && (
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
                            {compra.productosSeleccionados.map((producto) => (
                              <li key={producto.id} className="px-4 py-4 flex items-center justify-between text-sm">
                                <span className="text-black truncate">{producto.nombre}</span>
                                <span className="text-black">{producto.precio}</span>
                                <span className="text-black">{producto.cantidad}</span>
                                <span className="text-black">${producto.cantidad * producto.precio}</span>
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
            {[...Array(Math.ceil(filteredCompras.length / itemsPerPage)).keys()].map((number) => (
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
              disabled={currentPage === Math.ceil(filteredCompras.length / itemsPerPage)}
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
      {mostrarModal && (
        // Modal de registro de compra
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                {/* Contenido del formulario de registro de compra */}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Compras;
