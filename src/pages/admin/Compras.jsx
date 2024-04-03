import React, { useState } from 'react';
import { FaSearch, FaAngleDown, FaAngleUp } from "react-icons/fa";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";

const Compras = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [compras, setCompras] = useState([
    {
      id: 1,
      numeroCompra: '12345',
      descripcion: 'Compra de productos de papelería',
      fecha: '2024-04-03',
      estado: true,
      proveedor: 'Proveedor Uno',
      total: 0,
      productosSeleccionados: [
        { id: 1, nombre: 'Producto 1', cantidad: 2, precio: 100 },
        { id: 2, nombre: 'Producto 2', cantidad: 1, precio: 150 }
      ]
    },
    {
      id: 2,
      numeroCompra: '67890',
      descripcion: 'Compra de productos electrónicos',
      fecha: '2024-04-05',
      estado: false,
      proveedor: 'Proveedor Dos',
      total: 0,
      productosSeleccionados: [
        { id: 1, nombre: 'Producto 3', cantidad: 3, precio: 200 },
        { id: 2, nombre: 'Producto 4', cantidad: 2, precio: 300 }
      ]
    },
    // Puedes agregar más ejemplos de compras aquí
  ]);
  const [compraExpandida, setCompraExpandida] = useState(null);

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

  return (
    <div className="flex justify-center">
      <div className='bg-secondary-100 w-full rounded-lg'>
        <div className='flex justify-between p-5'>
          <h3>Registrar compra</h3>
          <button onClick={toggleModal} className='px-6 py-2 bg-green-500 rounded-full'>Registrar compra</button>
        </div>
        <div className='p-5 overflow-x-auto'>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Número de Compra
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proveedor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Mostrar Detalles</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {compras.map((compra) => (
                <React.Fragment key={compra.id}>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{compra.numeroCompra}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{compra.descripcion}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{compra.fecha}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${compra.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {compra.estado ? 'Activa' : 'Inactiva'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{compra.proveedor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${compra.productosSeleccionados.reduce((total, producto) => total + (producto.cantidad * producto.precio), 0)}
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
                        <div className="mt-4 mb-2">
                          <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                            {compra.productosSeleccionados.map((producto) => (
                              <li key={producto.id} className="px-4 py-4 flex items-center justify-between text-sm">
                                <span className="font-medium text-black truncate">{producto.nombre}</span>
                                <span className="font-medium text-black">{producto.cantidad}</span>
                                <span className="font-medium text-black">${producto.cantidad * producto.precio}</span>
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
