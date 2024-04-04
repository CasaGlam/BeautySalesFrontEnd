import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { FaPlus, FaMinus } from "react-icons/fa";

const Compras = () => {
  const [numeroCompra, setNumeroCompra] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [estado, setEstado] = useState(false);
  const [total, setTotal] = useState(0);
  const [proveedor, setProveedor] = useState('Proveedor Uno');
  const [busquedaProducto, setBusquedaProducto] = useState('');
  const [productos, setProductos] = useState(["Producto 1", "Producto 2", "Producto 3"]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

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
        // Aquí podrías guardar la compra, por ejemplo, haciendo una llamada a una API
        Swal.fire(
          'Compra realizada',
          'La compra ha sido realizada correctamente.',
          'success'
        ).then(() => {
          // Redirigir al usuario a la vista anterior "/compras"
          window.location.href = "/compras";
        });
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
        // Aquí podrías realizar alguna acción adicional antes de cancelar, si lo necesitas
        Swal.fire(
          'Compra cancelada',
          'La compra ha sido cancelada.',
          'error'
        ).then(() => {
          // Redirigir al usuario a la vista anterior "/compras"
          window.location.href = "/compras";
        });
      }
    });
  };

  return (
   <div className="bg-secondary-100 w-full rounded-lg">
     <div className="flex justify-center p-8">
      <div className='w-full'>
        <h3 className="text-2xl font-bold mb-4 text-white">Registrar compra</h3>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">Productos Seleccionados</label>
          <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
            {productosSeleccionados.map((producto, index) => (
              <li key={index} className="px-4 py-4 flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <button
                    className="bg-green-500 text-white rounded-md p-1 text-xs hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    onClick={() => restarCantidad(producto)}
                    type="button"
                  >
                    <FaMinus />
                  </button>
                  <span className="mx-2">{producto.cantidad}</span>
                  <button
                    className="bg-green-500 text-white rounded-md p-1 text-xs hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    onClick={() => agregarProducto(producto.nombre)}
                    type="button"
                  >
                    <FaPlus />
                  </button>
                </div>
                <span className="font-medium truncate">{producto.nombre}</span>
                <div className="flex items-center">
                  <button
                    className="bg-red-500 text-white rounded-md p-1 text-xs hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => eliminarProductoSeleccionado(producto)}
                    type="button"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4 ">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="buscarProducto">Buscar Producto</label>
          <div className="flex items-center border-b border-b-2 border-teal-500 py-2 gap-4">
            <input
              id="buscarProducto"
              className="appearance-none bg-transparent border rounded-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          </div>
        </div>
        {busquedaProducto && (
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Productos</label>
            <div className="overflow-y-scroll max-h-40">
              <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                {productos
                  .filter(producto => producto.toLowerCase().includes(busquedaProducto.toLowerCase()))
                  .map((producto, index) => (
                    <li key={index} className="px-4 py-4 flex items-center justify-between text-sm">
                      <span className="font-medium truncate">{producto}</span>
                      <button
                        className="bg-green-500 text-white rounded-md p-1 text-xs hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="numeroCompra">Número de Compra</label>
            <input
              id="numeroCompra"
              type="text"
              className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Número de Compra"
              value={numeroCompra}
              onChange={(e) => setNumeroCompra(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="descripcion">Descripción</label>
            <input
              id="descripcion"
              type="text"
              className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="fecha">Fecha</label>
            <input
              id="fecha"
              type="date"
              className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Fecha"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="estado">Estado</label>
            <select
              id="estado"
              className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value={true}>Activa</option>
              <option value={false}>Inactiva</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="proveedor">Proveedor</label>
            <select
              id="proveedor"
              className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={proveedor}
              onChange={(e) => setProveedor(e.target.value)}
            >
              <option value="Proveedor Uno">Proveedor Uno</option>
              <option value="Proveedor Dos">Proveedor Dos</option>
              {/* Agregar más opciones de proveedores según sea necesario */}
            </select>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
   </div>
  );
}

export default Compras;
