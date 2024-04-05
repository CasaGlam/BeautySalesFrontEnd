import React, { useState } from 'react';
import { FaSearch, FaTrashAlt, FaSave, FaTimes } from "react-icons/fa";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import Swal from 'sweetalert2';

const RegistrarVenta = () => {
  const [productosEncontrados, setProductosEncontrados] = useState([]);
  const precio = 2000; // Precio unitario de los productos
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState('Cliente Genérico');

  const buscarProducto = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const sugerencias = ["Producto 1", "Producto 2", "Producto 3"]; 
    const filteredSuggestions = sugerencias.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(value.toLowerCase()) > -1
    );

    setSuggestions(filteredSuggestions);
  };

  const agregarProducto = (producto) => {
    const productoExistente = productosEncontrados.find(item => item.nombre === producto);

    if (productoExistente) {
      const nuevosProductos = productosEncontrados.map(item =>
        item.nombre === producto ? { ...item, cantidad: item.cantidad + 1 } : item
      );
      setProductosEncontrados(nuevosProductos);
    } else {
      setProductosEncontrados([...productosEncontrados, {
        nombre: producto,
        cantidad: 1,
        precio: precio,
        cliente: clienteSeleccionado
      }]);
    }

    setInputValue('');
    setSuggestions([]);
  };

  const restarCantidad = (producto) => {
    const nuevosProductos = productosEncontrados.map(item =>
      item.nombre === producto.nombre ? { ...item, cantidad: Math.max(item.cantidad - 1, 0) } : item
    );
    setProductosEncontrados(nuevosProductos);
  };

  const eliminarProducto = (producto) => {
    const nuevosProductos = productosEncontrados.filter(item => item.nombre !== producto.nombre);
    setProductosEncontrados(nuevosProductos);
  };

  const subtotal = productosEncontrados.reduce((total, producto) => total + producto.cantidad * producto.precio, 0);

  const guardarVenta = () => {
    // Mostrar resumen de la venta antes de guardar
    const resumenVenta = productosEncontrados.map(producto => `${producto.nombre} x ${producto.cantidad} - $${producto.cantidad * producto.precio}`).join('\n');
    Swal.fire({
      title: 'Resumen de la Venta',
      text: `Productos:\n${resumenVenta}\n\nTotal: $${subtotal}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para guardar la venta
        Swal.fire(
          'Venta Guardada',
          'La venta ha sido guardada correctamente.',
          'success'
        ).then(() => {
          setProductosEncontrados([]);
          // Redirigir a donde necesites
        });
      }
    });
  };

  const cancelarVenta = () => {
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
        // Cancelar la venta
        setProductosEncontrados([]);
        // Redirigir a donde necesites
      }
    });
  };

  return (
    <div className="bg-secondary-100 w-full rounded-lg">
      <div className="flex justify-between p-4">
        <h3 className="text-2xl font-bold text-white">Registrar venta</h3>
        <div className="relative">
          <select
            value={clienteSeleccionado}
            onChange={(e) => setClienteSeleccionado(e.target.value)}
            className="px-4 py-1 text-black text-sm rounded-full bg-gray-300 border border-white"
            style={{ fontSize: '12px', width: '140px' }} // Estilos del selector de cliente
          >
            <option value="Cliente Genérico" className="text-black">Cliente Genérico</option>
            <option value="Cliente Uno" className="text-black">Cliente Uno</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center p-8">
        <div className="w-full">
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Buscar Producto</label>
            <div className="flex items-center border-b border-b-2 border-gray-200 py-2">
              <input
                type="text"
                placeholder="Buscar producto"
                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                value={inputValue}
                onChange={buscarProducto}
              />
              <FaSearch className="text-white" />
            </div>
            {suggestions.length > 0 && (
              <ul className="suggestions bg-gray-300 text-black absolute mt-1 w-full border border-gray-400 rounded-md py-2">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="p-3 hover:bg-gray-400 cursor-pointer" onClick={() => agregarProducto(suggestion)}>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Productos Agregados</label>
            <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
              {productosEncontrados.map((producto, index) => (
                <li key={index} className="px-4 py-4 flex items-center justify-between text-sm">
                  <div>
                    <div className="flex items-center">
                      <button
                        className="bg-green-500 text-white rounded-md p-1 text-xs hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        onClick={() => restarCantidad(producto)}
                        type="button"
                      >
                        <CiCircleMinus />
                      </button>
                      <span className="mx-2">{producto.cantidad}</span>
                      <button
                        className="bg-green-500 text-white rounded-md p-1 text-xs hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        onClick={() => agregarProducto(producto.nombre)}
                        type="button"
                      >
                        <CiCirclePlus />
                      </button>
                    </div>
                    <span className="text-white font-medium">{producto.nombre}</span>
                    <div>
                      <span className="text-white mr-2">Precio Unitario: ${producto.precio}</span>
                      <span className="text-white">Subtotal: ${producto.cantidad * producto.precio}</span>
                    </div>
                  </div>
                  <FaTrashAlt className="text-[#FF0000] cursor-pointer" onClick={() => eliminarProducto(producto)} />
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end gap-4">
            <p className="text-white font-bold">Total: ${subtotal}</p>
            <button onClick={guardarVenta} className="px-6 py-2 mt-10 bg-green-500 rounded-full text-white"><FaSave /></button>
            <button onClick={cancelarVenta} className="px-6 py-2 mt-10 bg-red-500 rounded-full text-white"><FaTimes /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrarVenta;
