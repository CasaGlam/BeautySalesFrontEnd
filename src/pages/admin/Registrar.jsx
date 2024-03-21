import React, { useState } from 'react';
import { FaSearch, FaTrashAlt, FaSave, FaTimes } from "react-icons/fa";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import Swal from 'sweetalert2';

const Registrar = () => {
  const [productosEncontrados, setProductosEncontrados] = useState([]);
  const precio = 2000;
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
    Swal.fire({
      title: 'Venta Agregada',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    }).then(() => {
      setProductosEncontrados([]);
    });
  };

  const cancelarVenta = () => {
    Swal.fire({
      title: 'Venta Cancelada',
      icon: 'error',
      timer: 2000,
      showConfirmButton: false
    }).then(() => {
      setProductosEncontrados([]);
    });
  };

  return (
    <div className="flex justify-center">
      <div className='bg-secondary-100 w-full rounded-lg'>
        <div className='flex justify-between p-5'>
          <h3>Registrar venta</h3>
          <div className='relative'>
            <select value={clienteSeleccionado} onChange={(e) => setClienteSeleccionado(e.target.value)} className="py-2 px-4 rounded-full outline-none text-black">
              <option value="Cliente Genérico">Cliente Genérico</option>
              <option value="Cliente Uno">Cliente Uno</option>
            </select>
          </div>
        </div>
        <div className='flex justify-between p-5'>
          <div className='flex items-center relative'>
            <input
              type="text"
              placeholder='Buscar producto'
              className='py-2 px-4 rounded-full outline-none text-black'
              value={inputValue}
              onChange={buscarProducto}
            />
            <FaSearch className='text-black absolute right-5' />
            {suggestions.length > 0 && (
              <ul className="suggestions bg-secondary-100 text-white absolute top-10 left-0 right-0 z-10 border border-gray-400 rounded-md py-2">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="p-3 hover:bg-secondary- cursor-pointer" onClick={() => agregarProducto(suggestion)}>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className='p-5'>
          <table className='min-w-full table-auto'>
            <thead>
              <tr className="text-gray-100 uppercase text-sm leading-normal border-b border-gray-200">
                <th className="py-3 px-6 text-center">Descripción</th>
                <th className="py-3 px-6 text-center">Cantidad</th>
                <th className="py-3 px-6 text-center">Precio</th>
                <th className="py-3 px-6 text-center">Subtotal</th>
                <th className="py-3 px-6 text-center"></th>
              </tr>
            </thead>
            <tbody className="text-gray-200 text-sm font-light">
              {productosEncontrados.map((producto, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-secondary-100">
                  <td className="py-3 px-6 text-center whitespace-nowrap">{producto.nombre}</td>
                  <td className="py-3 px-6 text-center flex items-center justify-center gap-3">
                    <CiCircleMinus className='cursor-pointer' onClick={() => restarCantidad(producto)} />
                    {producto.cantidad}
                    <CiCirclePlus className='cursor-pointer' onClick={() => agregarProducto(producto.nombre)} />
                  </td>
                  <td className="py-3 px-6 text-center">{producto.precio}</td>
                  <td className="py-3 px-6 text-center">{producto.cantidad * producto.precio}</td>
                  <td className="py-3 px-6 text-center"><FaTrashAlt className='text-[#FF0000] cursor-pointer' onClick={() => eliminarProducto(producto)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='flex justify-end gap-4'>
            <p className='text-[20px] pr-5'>Total: {subtotal}</p>
            <button onClick={guardarVenta} className='px-6 py-2 mt-10 bg-green-500 rounded-full'><FaSave /></button>
            <button onClick={cancelarVenta} className='px-6 py-2 mt-10 bg-red-500 rounded-full'><FaTimes /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registrar;
