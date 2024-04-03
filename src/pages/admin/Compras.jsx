import React, { useState } from 'react';
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";


const Compras = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [numeroCompra, setNumeroCompra] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [estado, setEstado] = useState(false);
  const [total, setTotal] = useState(0);
  const [proveedor, setProveedor] = useState('Proveedor Uno');
  const [busquedaProducto, setBusquedaProducto] = useState('');
  const [productos, setProductos] = useState(["Producto 1", "Producto 2", "Producto 3"]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  const toggleModal = () => {
    setMostrarModal(!mostrarModal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: '¿Desea confirmar la compra?',
      text: 'Una vez confirmada, la compra será procesada.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Compra realizada',
          'La compra ha sido realizada correctamente.',
          'success'
        );
        setMostrarModal(false);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Compra cancelada',
          'La compra ha sido cancelada.',
          'error'
        );
      }
    });
  };

  const handleCancel = () => {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Si cancela, se perderán los datos ingresados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, volver',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        setMostrarModal(false);
        Swal.fire(
          'Compra cancelada',
          'La compra ha sido cancelada.',
          'error'
        );
      }
    });
  };

  const agregarProducto = (producto) => {
    const productoExistente = productosSeleccionados.find(item => item.nombre === producto);

    if (productoExistente) {
      const nuevosProductos = productosSeleccionados.map(item =>
        item.nombre === producto ? { ...item, cantidad: item.cantidad + 1 } : item
      );
      setProductosSeleccionados(nuevosProductos);
    } else {
      setProductosSeleccionados([...productosSeleccionados, {
        nombre: producto,
        cantidad: 1,
        precio: 100, // Precio de ejemplo
      }]);
    }
    setTotal(total + 100); // Ajustar el total según el precio del producto
  };

  const restarCantidad = (producto) => {
    const nuevosProductos = productosSeleccionados.map(item =>
      item.nombre === producto.nombre ? { ...item, cantidad: Math.max(item.cantidad - 1, 0) } : item
    );
    setProductosSeleccionados(nuevosProductos);
    setTotal(total - 100); // Ajustar el total según el precio del producto
  };

  const eliminarProductoSeleccionado = (producto) => {
    const nuevosProductos = productosSeleccionados.filter(item => item.nombre !== producto.nombre);
    setProductosSeleccionados(nuevosProductos);
    setTotal(total - producto.cantidad * producto.precio);
  };

  return (
    <div className="flex justify-center">
      <div className='bg-secondary-100 w-full rounded-lg'>
        <div className='flex justify-between p-5'>
          <h3>Registrar compra</h3>
          <button onClick={toggleModal} className='px-6 py-2 bg-green-500 rounded-full'>Registrar compra</button>
        </div>
        <div className='p-5'>
          {/* Aquí va el código para mostrar las compras */}
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
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="buscarProducto">
                      Buscar Producto
                    </label>
                    <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
                      <input
                        className="appearance-none bg-transparent border rounded-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="buscarProducto"
                        type="text"
                        placeholder="Buscar"
                        value={busquedaProducto}
                        onChange={(e) => setBusquedaProducto(e.target.value)}
                      />
                      <button
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 text-sm border-4 text-white py-1 px-2 rounded"
                        type="button"
                        onClick={() => setBusquedaProducto('')}
                      >
                        Limpiar
                      </button>
                      <FaSearch className="fill-current text-gray-500 mx-3" />
                    </div>
                  </div>
                  {busquedaProducto && (
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Productos
                      </label>
                      <div className="overflow-y-scroll max-h-40">
                        <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                          {productos
                            .filter(producto => producto.toLowerCase().includes(busquedaProducto.toLowerCase()))
                            .map((producto, index) => (
                              <li key={index} className="px-4 py-4 flex items-center justify-between text-sm">
                                <span className="font-medium truncate">{producto}</span>
                                <button
                                  className="bg-green-500 text-white rounded-md p-1 text-xs hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:
                                  ring-green-500"
                                  onClick={() => agregarProducto(producto)}
                                  type="button"
                                >
                                  Agregar
                                </button>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  {productosSeleccionados.length > 0 && (
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Productos Seleccionados
                      </label>
                      <div className="overflow-y-scroll max-h-40">
                        <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                          {productosSeleccionados.map((producto, index) => (
                            <li key={index} className="px-4 py-4 flex items-center justify-between text-sm">
                              <span className="font-medium truncate">{producto.nombre}</span>
                              <div className="flex items-center">
                                <button
                                  className="bg-green-500 text-white rounded-md p-1 text-xs hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                  onClick={() => restarCantidad(producto)}
                                  type="button"
                                >
                                  -
                                </button>
                                <span className="mx-2">{producto.cantidad}</span>
                                <button
                                  className="bg-green-500 text-white rounded-md p-1 text-xs hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                  onClick={() => agregarProducto(producto.nombre)}
                                  type="button"
                                >
                                  +
                                </button>
                                <button
                                  className="bg-red-500 text-white rounded-md p-1 text-xs hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                  onClick={() => eliminarProductoSeleccionado(producto)}
                                  type="button"
                                >
                                  <FaTrashAlt />
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Número de Compra
                    </label>
                    <input
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Número de Compra"
                      value={numeroCompra}
                      onChange={(e) => setNumeroCompra(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Descripción
                    </label>
                    <input
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Descripción"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Fecha
                    </label>
                    <input
                      type="date"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Fecha"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Estado
                    </label>
                    <select
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={estado}
                      onChange={(e) => setEstado(e.target.value)}
                    >
                      <option value={true}>Activa</option>
                      <option value={false}>Inactiva</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Proveedor
                    </label>
                    <select
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={proveedor}
                      onChange={(e) => setProveedor(e.target.value)}
                    >
                      <option value="Proveedor Uno">Proveedor Uno</option>
                      <option value="Proveedor Dos">Proveedor Dos</option>
                      {/* Agregar más opciones de proveedores según sea necesario */}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Total
                    </label>
                    <input
                      type="number"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Total"
                      value={total}
                      onChange={(e) => setTotal(e.target.value)}
                    />
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:mr-3 sm:w-auto sm:text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

      )}

<div >
        <Link to="/compras/registrar-compra">
          <button className='border p-5'>Registrar compra</button>
        </Link>
        <Link to="/compras/editar-compra">
          <button className='border p-5'>Editar compra</button>
        </Link>
      </div>
    </div>
  );
}

export default Compras;
