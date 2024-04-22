import React, { useState, useEffect } from 'react';
import { FaSearch, FaAngleDown, FaAngleUp, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const Compras = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [compras, setCompras] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [compraExpandida, setCompraExpandida] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [nuevoEstadoCompra, setNuevoEstadoCompra] = useState('');
  const [descripcionEstadoCompra, setDescripcionEstadoCompra] = useState('');
  const [compraSeleccionada, setCompraSeleccionada] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchCompras();
    fetchProveedores();
    fetchProductos();
  }, []);

  const fetchCompras = () => {
    fetch('http://localhost:8080/api/compras')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCompras(data);
        } else {
          console.error('Datos de compras no encontrados en la respuesta:', data);
        }
      })
      .catch(error => console.error('Error fetching compras:', error));
  };

  const fetchProveedores = () => {
    fetch('http://localhost:8080/api/proveedores')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.proveedores)) {
          setProveedores(data.proveedores);
        } else {
          console.error('Datos de proveedores no encontrados en la respuesta:', data);
        }
      })
      .catch(error => console.error('Error fetching proveedores:', error));
  };

  const fetchProductos = () => {
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
  };

  const toggleModal = () => {
    setMostrarModal(!mostrarModal);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Resetear a la primera página al buscar
  };

  const handleEstadoChange = (event) => {
    setNuevoEstadoCompra(event.target.value);
  };

  const handleDescripcionEstadoChange = (event) => {
    setDescripcionEstadoCompra(event.target.value);
  };

  const getProveedorName = (idProveedor) => {
    const proveedor = proveedores.find(proveedor => proveedor._id === idProveedor);
    return proveedor ? proveedor.nombre : 'Proveedor no encontrado';
  };

  const getProductoName = (idProducto) => {
    const producto = productos.find(producto => producto._id === idProducto);
    return producto ? producto.nombre : 'Producto no encontrado';
  };

  const getNumeroVenta = (idCompra) => {
    const compra = compras.find(compra => compra._id === idCompra);
    return compra ? compra.numeroVenta : 'Venta no encontrada';
  };

  const updateCompraEstado = async (compraId, estado, descripcionEstado) => {
    try {
      const response = await fetch(`http://localhost:8080/api/compras/${compraId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado, descripcionEstado }),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar estado de compra');
      }
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleEstadoUpdate = async () => {
    try {
      const nuevoEstado = nuevoEstadoCompra === 'Activa' ? true : false; // Mapear el estado a un booleano
      await updateCompraEstado(compraSeleccionada._id, nuevoEstado, descripcionEstadoCompra);
      toggleModal();
      Swal.fire({
        icon: 'success',
        title: 'Estado actualizado correctamente',
      });
      fetchCompras(); // Actualizar las compras después de guardar el cambio
    } catch (error) {
      console.error('Error al actualizar estado de compra:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar estado de compra',
        text: error.message,
      });
    }
  };

  const filteredCompras = compras.filter((compra) =>
    compra.numeroCompra.toString().includes(searchTerm)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCompras.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleModalOpen = (compra) => {
    setCompraSeleccionada(compra);
    setNuevoEstadoCompra(compra.estado ? 'Activa' : 'Inactiva');
    setDescripcionEstadoCompra(compra.descripcionEstado || '');
    toggleModal();
  };

  return (
    <div className="flex justify-center">
      <div className='bg-secondary-100 w-full rounded-lg'>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6  p-8">
          <div>
            <h1 className="text-2xl font-bold mb-4 pt-4 text-texto-100">Registro de compras</h1>
          </div>
          <div className="flex gap-4">
            <div>
              <input
                className="w-full px-2 py-2 rounded-lg pl-4 placeholder-black text-black bg-secondary-900"
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider">
                  Número de Compra
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider">
                  Descripción
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider">
                  Fecha de Registro
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider">
                  Fecha de Compra
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider">
                  Proveedor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Mostrar Detalles</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-300 divide-y divide-black rounded-lg">
              {currentItems.map((compra) => (
                <React.Fragment key={compra._id}>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-black">{compra.numeroCompra}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-black">{compra.descripcion}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-black">{new Date(compra.fechaRegistro).toISOString().slice(0, 10)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-black">{new Date(compra.fecha).toISOString().slice(0, 10)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${compra.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {compra.estado ? 'Activa' : 'Inactiva'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-black">{getProveedorName(compra.idProveedor)}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-black">
                      ${compra.detallesCompra.reduce((acc, detalle) => acc + (detalle.precioVenta * detalle.cantidad), 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => setCompraExpandida(compraExpandida === compra._id ? null : compra._id)} className="text-indigo-600 hover:text-indigo-900 focus:outline-none">
                        {compraExpandida === compra._id ? <FaAngleUp /> : <FaAngleDown />}
                      </button>
                      <button onClick={() => handleModalOpen(compra)} className="text-green-600 hover:text-green-900 focus:outline-none ml-2">
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                  {compraExpandida === compra._id && (
                    <tr>
                      <td colSpan="8">
                        <div className="mt-4 mb-2 px-8">
                          <ul className="border border-gray-400 rounded-md divide-y divide-gray-500">
                            <li className="px-4 py-2 bg-secondary-900 flex items-center justify-between text-sm font-medium">
                              <span className='text-texto-100'>Producto</span>
                              <span className='text-texto-100'>Precio de compra</span>
                              <span className='text-texto-100'>Precio de venta</span>
                              <span className='text-texto-100'>Cantidad</span>
                              <span className='text-texto-100'>Total</span>
                            </li>
                            {compra.detallesCompra.map((detalle) => (
                              <li key={detalle._id} className="px-4 py-4 flex items-center justify-between text-sm">
                                <span className="text-black truncate">{getProductoName(detalle.idProducto)}</span>
                                <span className="text-black">{detalle.precioCompra}</span>
                                <span className="text-black">{detalle.precioVenta}</span>
                                <span className="text-black">{detalle.cantidad}</span>
                                <span className="text-black">${detalle.precioVenta * detalle.cantidad}</span>
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
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary text-texto-900 text-sm font-medium ${
                  currentPage === number + 1
                    ? 'text-primary bg-primary'
                    : 'text-gray-700 hover:text-gray-500'
                }`}
              >
                {number + 1}
              </button>
            ))}
            {/* Botón para ir a la siguiente página */}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredCompras.length / itemsPerPage)}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              {/* Heroicon name: solid/chevron-right */}
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M6.293 15.707a1 1 0 0 1-1.414-1.414L9.914 10 4.293 4.293a1 1 0 1 1 1.414-1.414l6 6a1 1 0 0 1 0 1.414l-6 6z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
        {mostrarModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              {/* Background overlay, show/hide based on modal state */}
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
              {/* This element is to trick the browser into centering the modal contents. */}
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              {/* Modal panel, show/hide based on modal state */}
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 sm:mx-0 sm:h-10 sm:w-10">
                      {/* Heroicon name: outline/exclamation */}
                      <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.61-1.59 1.864-3.014L13.864 4.986C13.12 3.61 11.999 3.61 11.255 4.986L4.938 18zm0 0v-5.999L4.999 4h14l.061 8.001M12 9h.01"></path>
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                        Actualizar estado de compra
                      </h3>
                      <div className="mt-2">
                        <select
                          value={nuevoEstadoCompra}
                          onChange={handleEstadoChange}
                          className="w-full text-black rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:border-primary"
                        >
                          <option value="Activa">Activa</option>
                          <option value="Inactiva">Inactiva</option>
                        </select>
                      </div>
                      <div className="mt-2">
                        <textarea
                          value={descripcionEstadoCompra}
                          onChange={handleDescripcionEstadoChange}
                          placeholder="Ingrese la descripción del cambio de estado..."
                          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={handleEstadoUpdate}
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-opacity-[80%] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Guardar Cambios
                  </button>
                  <button
                    onClick={toggleModal}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compras;
