import React, { useState } from 'react';
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

const Registrar = () => {
  const [cant, setCant] = useState(0);
  const [productosEncontrados, setProductosEncontrados] = useState([]);
  const precio = 2000;
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const subirCant = () => {
    setCant(cant + 1);
  };

  const bajarCant = () => {
    if (cant > 0) {
      setCant(cant - 1);
    }
  };

  const subtotal = cant * precio;
  const total = subtotal;

  const buscarProducto = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Simular la búsqueda de productos según el valor ingresado
    // Esto puede venir de una API o base de datos
    // Por ahora, solo se agregan productos de ejemplo
    const sugerencias = ["Producto 1", "Producto 2", "Producto 3"]; // Ejemplo de sugerencias
    const filteredSuggestions = sugerencias.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(value.toLowerCase()) > -1
    );

    setSuggestions(filteredSuggestions);
  };

  const agregarProducto = (producto) => {
    // Agregar el producto seleccionado a la tabla
    setProductosEncontrados([...productosEncontrados, {
      nombre: producto,
      cantidad: 1,
      precio: precio
    }]);
    setInputValue(''); // Limpiar el input de búsqueda después de agregar el producto
    setSuggestions([]); // Limpiar las sugerencias
  };

  return (
    <div>
      <div className='bg-secondary-100 w-full rounded-lg'>
        <div className='flex justify-between p-5'>
          <h3>Registrar venta</h3>
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
          <div className='flex justify-end p-5'>
            <p className='text-[20px] pr-5'>Total: {total}</p>
          </div>
        <hr />
        <div className='p-5'>
          <table className='min-w-full table-auto'>
            <thead>
              <tr className=" text-gray-100 uppercase text-sm leading-normal border-b border-gray-200">
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
                    <CiCircleMinus className='cursor-pointer' onClick={bajarCant} />
                    {producto.cantidad}
                    <CiCirclePlus className='cursor-pointer' onClick={subirCant} />
                  </td>
                  <td className="py-3 px-6 text-center">{producto.precio}</td>
                  <td className="py-3 px-6 text-center">{producto.cantidad * producto.precio}</td>
                  <td className="py-3 px-6 text-center"><FaTrashAlt className='text-[#FF0000] cursor-pointer'/></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='flex justify-end gap-4'>
          <button className='px-6 py-2 mt-10 bg-red-500 rounded-full'>Cancelar</button>
          <button className='px-6 py-2 mt-10 bg-green-500 rounded-full'>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registrar;
