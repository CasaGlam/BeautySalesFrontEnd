import React, { useState } from 'react';
import { FaSearch, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import Swal from 'sweetalert2';

const Categorias = () => {
  const [mostrarAgregarCategoria, setMostrarAgregarCategoria] = useState(false);
  const [mostrarEditarCategoria, setMostrarEditarCategoria] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [categoriaAEditar, setCategoriaAEditar] = useState(null);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    estado: ''
  });

  const desplegarVentanaCategoria = () => {
    setMostrarAgregarCategoria(!mostrarAgregarCategoria);
  };

  const guardarNuevaCategoria = () => {
    if (!nuevaCategoria.id || !nuevaCategoria.nombre || !nuevaCategoria.descripcion || !nuevaCategoria.estado) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
      });
      return;
    }

    // Aquí puedes agregar lógica para guardar la nueva categoría
    Swal.fire({
      icon: 'success',
      title: 'Categoría Guardada',
      text: 'La categoría se ha guardado exitosamente.',
    });
    setMostrarAgregarCategoria(false);
  };

  const handleEditarCategoria = (categoria) => {
    setCategoriaAEditar(categoria);
    setMostrarEditarCategoria(true);
  };

  const handleEliminarCategoria = (categoriaId) => {
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: 'Una vez eliminada, no podrás recuperar esta categoría.',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const categoriasActualizadas = categorias.filter(categoria => categoria.id !== categoriaId);
        setCategorias(categoriasActualizadas);
        Swal.fire(
          'Eliminada',
          'La categoría ha sido eliminada correctamente.',
          'success'
        );
      }
    });
  };

  const handleBuscar = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setBusqueda(searchTerm);
    const filteredCategorias = categorias.filter((categoria) =>
      categoria.nombre.toLowerCase().includes(searchTerm)
    );
    setCategoriasFiltradas(filteredCategorias);
  };

  const categorias = [
    {
      id: 1,
      nombre: 'Categoría 1',
      descripcion: 'Descripción de la Categoría 1',
      estado: 'Activa'
    },
    {
      id: 2,
      nombre: 'Categoría 2',
      descripcion: 'Descripción de la Categoría 2',
      estado: 'Inactiva'
    },
  ];

  return (
    <div className={`overflow-x-auto ${mostrarAgregarCategoria || mostrarEditarCategoria ? 'blur-background' : 'no-blur-background'}`}>
      <div className="bg-secondary-100 w-full rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mr-4">Registrar Categorías</h1>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Buscar categoría..."
              value={busqueda}
              onChange={handleBuscar}
              className="py-2 px-4 rounded-md mr-4"
            />
            <button
              className="bg-primary text-secondary-900 py-2 px-4 rounded-[10px]"
              onClick={desplegarVentanaCategoria}
            >
              Agregar Categoría
            </button>
          </div>
        </div>

        {mostrarAgregarCategoria && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="absolute w-full h-full bg-gray-900 opacity-70"></div>
            <div className="bg-secondary-100 p-8 rounded-lg flex flex-col relative z-10">
              <h2 className="text-2xl font-bold mb-4 ">Agregar Nueva Categoría</h2>
              {/* Campos de entrada para agregar categoría */}
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="ID"
                  className="border bg-secondary-900 border-secondary-900  text-white rounded-md px-3 py-2 w-full"
                  value={nuevaCategoria.id}
                  onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, id: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Nombre"
                  className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 w-full"
                  value={nuevaCategoria.nombre}
                  onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, nombre: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Descripción"
                  className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 w-full"
                  value={nuevaCategoria.descripcion}
                  onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, descripcion: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Estado"
                  className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 w-full"
                  value={nuevaCategoria.estado}
                  onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, estado: e.target.value })}
                />
              </div>
              {/* Botones de guardar y cancelar */}
              <div className='w-full flex gap-2 mt-4'>
                <button
                  className="bg-green-500 hover:bg-green-700 text-black px-4 py-2 rounded-md w-full flex items-center justify-center"
                  onClick={guardarNuevaCategoria}
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
                        setMostrarAgregarCategoria(false);
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

        {/* Tabla de categorías */}
        <table className="min-w-full table-auto">
          <thead>
            <tr className="text-gray-100 uppercase text-sm leading-normal border-b border-gray-200">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Descripción</th>
              <th className="py-3 px-">Estado</th>
              <th className="py-3 px-6 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-200 text-sm font-light">
            {categoriasFiltradas.map((categoria) => (
              <tr key={categoria.id} className="border-b border-gray-200 hover:bg-secondary-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{categoria.id}</td>
                <td className="py-3 px-6 text-left">{categoria.nombre}</td>
                <td className="py-3 px-6 text-left">{categoria.descripcion}</td>
                <td className="py-3 px-6 text-left">{categoria.estado}</td>
                <td className="py-3 px-6 text-left">
                  {/* Botón de Editar */}
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleEditarCategoria(categoria)}
                  >
                    <FaEdit/>
                  </button>
                  {/* Botón de Eliminar */}
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={handleEliminarCategoria}
                  >
                    <FaTrash/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {mostrarEditarCategoria && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="absolute w-full h-full bg-gray-900 opacity-70"></div>
          <div className="bg-secondary-100 p-8 rounded-lg flex flex-col relative z-10">
            <h2 className="text-2xl font-bold mb-4 ">Editar Categoría</h2>
            {/* Campos de entrada para editar categoría */}
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="ID"
                className="border bg-secondary-900 border-secondary-900  text-white rounded-md px-3 py-2 w-full"
                value={categoriaAEditar.id}
                onChange={(e) => setCategoriaAEditar({ ...categoriaAEditar, id: e.target.value })}
              />
              <input
                type="text"
                placeholder="Nombre"
                className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 w-full"
                value={categoriaAEditar.nombre}
                onChange={(e) => setCategoriaAEditar({ ...categoriaAEditar, nombre: e.target.value })}
              />
              <input
                type="text"
                placeholder="Descripción"
                className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 w-full"
                value={categoriaAEditar.descripcion}
                onChange={(e) => setCategoriaAEditar({ ...categoriaAEditar, descripcion: e.target.value })}
              />
              <input
                type="text"
                placeholder="Estado"
                className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 w-full"
                value={categoriaAEditar.estado}
                onChange={(e) => setCategoriaAEditar({ ...categoriaAEditar, estado: e.target.value })}
              />
            </div>
            {/* Botones de guardar y cancelar */}
            <div className='w-full flex gap-2 mt-4'>
              <button
                className="bg-green-500 hover:bg-green-700 text-black px-4 py-2 rounded-md w-full flex items-center justify-center"
                onClick={() => {
                  Swal.fire({
                    icon: 'success',
                    title: 'Categoría Actualizada',
                    text: 'La categoría se ha actualizado exitosamente.',
                  });
                  setMostrarEditarCategoria(false);
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
                      setMostrarEditarCategoria(false);
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

export default Categorias;