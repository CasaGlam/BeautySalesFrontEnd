import React, { useState } from 'react';
import { FaSearch, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import Swal from 'sweetalert2';

const Productos = () => {
  const [mostrarAgregarProducto, setMostrarAgregarProducto] = useState(false);
  const [mostrarEditarProducto, setMostrarEditarProducto] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',
    cantidad: '',
    descripcion: '',
    estado: ''
  });

  const desplegarVentanaProducto = () => {
    setMostrarAgregarProducto(!mostrarAgregarProducto);
  };

  const guardarNuevoProducto = () => {
    if (!nuevoProducto.nombre || !nuevoProducto.precio || !nuevoProducto.cantidad || !nuevoProducto.descripcion || !nuevoProducto.estado) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
      });
      return;
    }

    // Aquí puedes agregar lógica para guardar el nuevo producto
    Swal.fire({
      icon: 'success',
      title: 'Producto Guardado',
      text: 'El producto se ha guardado exitosamente.',
    });
    setMostrarAgregarProducto(false);
  };

  const handleEditarProducto = (producto) => {
    setProductoAEditar(producto);
    setMostrarEditarProducto(true);
  };

  const handleEliminarProducto = () => {
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar este producto.',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes agregar la lógica para eliminar el producto
        Swal.fire(
          'Eliminado',
          'El producto ha sido eliminado correctamente.',
          'success'
        );
      }
    });
  };

  const handleBuscar = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setBusqueda(searchTerm);
    const filteredProductos = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(searchTerm)
    );
    setProductosFiltrados(filteredProductos);
  };

  const productos = [
    {
      id: 1,
      nombre: 'Producto 1',
      precio: '$10',
      cantidad: 5,
      descripcion: 'Descripción del Producto 1',
      estado: 'Disponible'
    },
    {
      id: 2,
      nombre: 'Producto 2',
      precio: '$20',
      cantidad: 3,
      descripcion: 'Descripción del Producto 2',
      estado: 'Agotado'
    },
  ];

  return (
    <div className={`overflow-x-auto ${mostrarAgregarProducto || mostrarEditarProducto ? 'blur-background' : 'no-blur-background'}`}>
      <div className="bg-secondary-100 w-full rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mr-4">Registrar Productos</h1>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={handleBuscar}
              className="py-2 px-4 rounded-md mr-4"
            />
            <button
              className="bg-primary text-secondary-900 py-2 px-4 rounded-[10px]"
              onClick={desplegarVentanaProducto}
            >
              Agregar Producto
            </button>
          </div>
        </div>

        {mostrarAgregarProducto && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="absolute w-full h-full bg-gray-900 opacity-70"></div>
            <div className="bg-secondary-100 p-8 rounded-lg flex flex-col relative z-10">
              <h2 className="text-2xl font-bold mb-4 ">Agregar Nuevo Producto</h2>
              {/* Campos de entrada para agregar producto */}
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="border bg-secondary-900 border-secondary-900  text-white rounded-md px-3 py-2 w-full"
                  value={nuevoProducto.nombre}
                  onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Precio"
                  className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 w-full"
                  value={nuevoProducto.precio}
                  onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Cantidad"
                  className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 w-full"
                  value={nuevoProducto.cantidad}
                  onChange={(e) => setNuevoProducto({ ...nuevoProducto, cantidad: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Descripción"
                  className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 w-full"
                  value={nuevoProducto.descripcion}
                  onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Estado"
                  className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 w-full"
                  value={nuevoProducto.estado}
                  onChange={(e) => setNuevoProducto({ ...nuevoProducto, estado: e.target.value })}
                />
              </div>
              {/* Botones de guardar y cancelar */}
              <div className='w-full flex gap-2 mt-4'>
                <button
                  className="bg-green-500 hover:bg-green-700 text-black px-4 py-2 rounded-md w-full flex items-center justify-center"
                  onClick={guardarNuevoProducto}
                >
                  <FaSave className="text-white" />
                </button>
                <button
                  className="text-black bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md w-full flex items-center justify-center"
                  onClick={() => {
                    Swal.fire({
                      icon: 'info',
                      title: 'Cancelar',
                      text: '¿Estás seguro de cancelar?',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Sí, cancelar',
                      cancelButtonText: 'No',
                    }).then((result) => {
                      if (result.isConfirmed) {
                        setMostrarAgregarProducto(false);
                      }
                    });
                  }}
                >
                  <FaTimes className="text-white" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tabla de productos */}
        <table className="min-w-full table-auto">
          <thead>
            <tr className="text-gray-100 uppercase text-sm leading-normal border-b border-gray-200">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Precio</th>
              <th className="py-3 px-6 text-left">Cantidad</th>
              <th className="py-3 px-6 text-left">Descripción</th>
              <th className="py-3 px-6 text-left">Estado</th>
              <th className="py-3 px-6 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-200 text-sm font-light">
            {productosFiltrados.map((producto) => (
              <tr key={producto.id} className="border-b border-gray-200 hover:bg-secondary-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{producto.id}</td>
                <td className="py-3 px-6 text-left">{producto.nombre}</td>
                <td className="py-3 px-6 text-left">{producto.precio}</td>
                <td className="py-3 px-6 text-left">{producto.cantidad}</td>
                <td className="py-3 px-6 text-left">{producto.descripcion}</td>
                <td className="py-3 px-6 text-left">{producto.estado}</td>
                <td className="py-3 px-6 text-left">
                  {/* Botón de Editar */}
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleEditarProducto(producto)}
                  >
                    <FaEdit/>
                  </button>
                  {/* Botón de Eliminar */}
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={handleEliminarProducto}
                  >
                    <FaTrash/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {mostrarEditarProducto && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="absolute w-full h-full bg-gray-900 opacity-70"></div>
          <div className="bg-secondary-100 p-8 rounded-lg flex flex-col relative z-10">
            <h2 className="text-2xl font-bold mb-4 ">Editar Producto</h2>
            {/* Campos de entrada para editar producto */}
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nombre"
                className="border bg-secondary-900 border-secondary-900  text-white rounded-md px-3 py-2 w-full"
                value={productoAEditar.nombre}
                onChange={(e) => setProductoAEditar({ ...productoAEditar, nombre: e.target.value })}
              />
              <input
                type="text"
                placeholder="Precio"
                className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 w-full"
                value={productoAEditar.precio}
                onChange={(e) => setProductoAEditar({ ...productoAEditar, precio: e.target.value })}
              />
              <input
                type="text"
                placeholder="Cantidad"
                className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 w-full"
                value={productoAEditar.cantidad}
                onChange={(e) => setProductoAEditar({ ...productoAEditar, cantidad: e.target.value })}
              />
              <input
                type="text"
                placeholder="Descripción"
                className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 w-full"
                value={productoAEditar.descripcion}
                onChange={(e) => setProductoAEditar({ ...productoAEditar, descripcion: e.target.value })}
              />
              <input
                type="text"
                placeholder="Estado"
                className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 w-full"
                value={productoAEditar.estado}
                onChange={(e) => setProductoAEditar({ ...productoAEditar, estado: e.target.value })}
              />
            </div>
            {/* Botones de guardar y cancelar */}
            <div className='w-full flex gap-2 mt-4'>
              <button
                className="bg-green-500 hover:bg-green-700 text-black px-4 py-2 rounded-md w-full flex items-center justify-center"
                onClick={() => {
                  Swal.fire({
                    icon: 'success',
                    title: 'Producto Actualizado',
                    text: 'El producto se ha actualizado exitosamente.',
                  });
                  setMostrarEditarProducto(false);
                }}
              >
                <FaSave className="text-white" />
              </button>
              <button
                className="text-black bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md w-full flex items-center justify-center"
                onClick={() => {
                  Swal.fire({
                    icon: 'info',
                    title: 'Cancelar',
                    text: '¿Estás seguro de cancelar?',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, cancelar',
                    cancelButtonText: 'No',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      setMostrarEditarProducto(false);
                    }
                  });
                }}
              >
                <FaTimes className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productos;