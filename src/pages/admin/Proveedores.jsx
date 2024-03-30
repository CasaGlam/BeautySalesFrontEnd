import React, { useState } from 'react';
import { FaSearch, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import Swal from 'sweetalert2';

const Proveedores = () => {
  const [mostrarAgregarProveedor, setMostrarAgregarProveedor] = useState(false);
  const [mostrarEditarProveedor, setMostrarEditarProveedor] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [proveedoresFiltrados, setProveedoresFiltrados] = useState([]);
  const [proveedorAEditar, setProveedorAEditar] = useState(null);
  const [nuevoProveedor, setNuevoProveedor] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    direccion: ''
  });

  const desplegarVentanaProveedor = () => {
    setMostrarAgregarProveedor(!mostrarAgregarProveedor);
  };

  const guardarNuevoProveedor = () => {
    if (!nuevoProveedor.nombre || !nuevoProveedor.telefono || !nuevoProveedor.correo || !nuevoProveedor.direccion) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Proveedor Guardado',
      text: 'El proveedor se ha guardado exitosamente.',
    });
    setMostrarAgregarProveedor(false);
  };

  const handleEditarProveedor = (proveedor) => {
    setProveedorAEditar(proveedor);
    setMostrarEditarProveedor(true);
  };

  const handleEliminarProveedor = (proveedorId) => {
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar este proveedor.',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const proveedoresActualizados = proveedores.filter(proveedor => proveedor.id !== proveedorId);
        setProveedores(proveedoresActualizados);
        Swal.fire(
          'Eliminado',
          'El proveedor ha sido eliminado correctamente.',
          'success'
        );
      }
    });
  };

  const handleBuscar = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setBusqueda(searchTerm);
    const filteredProveedores = proveedores.filter((proveedor) =>
      proveedor.nombre.toLowerCase().includes(searchTerm)
    );
    setProveedoresFiltrados(filteredProveedores);
  };

  const proveedores = [
    {
      id: 1,
      nombre: 'Alexa',
      telefono: '3117432572',
      correo: 'Alexa@gmail.com',
      direccion: 'Calle 63, Ciudad, País',
    },
    {
      id: 2,
      nombre: 'Carlos',
      telefono: '3004185451',
      correo: 'carlos@gmail.com',
      direccion: 'Calle 51, Ciudad, País',
    },
  ];

  return (
    <div className={`overflow-x-auto ${mostrarAgregarProveedor || mostrarEditarProveedor ? 'blur-background' : 'no-blur-background'}`}>
      <div className="bg-secondary-100 w-full rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mr-4">Registrar Proveedor</h1>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Buscar proveedor..."
              value={busqueda}
              onChange={handleBuscar}
              className="py-2 px-4 rounded-md mr-4"
            />
            <button
              className="bg-primary text-secondary-900 py-2 px-4 rounded-[10px]"
              onClick={desplegarVentanaProveedor}
            >
              Agregar Proveedor
            </button>
          </div>
        </div>

        {mostrarAgregarProveedor && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="absolute w-full h-full bg-gray-900 opacity-70"></div>
            <div className="bg-secondary-100 p-8 rounded-lg flex flex-col relative z-10">
              <h2 className="text-2xl font-bold mb-4 ">Agregar Nuevo Proveedor</h2>
              {/* Campos de entrada para agregar proveedor */}
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="border bg-secondary-900 border-secondary-900  text-white rounded-md px-3 py-2 w-full"
                  value={nuevoProveedor.nombre}
                  onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, nombre: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Teléfono"
                  className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 w-full"
                  value={nuevoProveedor.telefono}
                  onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, telefono: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Correo"
                  className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 w-full"
                  value={nuevoProveedor.correo}
                  onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, correo: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Dirección"
                  className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 w-full"
                  value={nuevoProveedor.direccion}
                  onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, direccion: e.target.value })}
                />
              </div>
              {/* Botones de guardar y cancelar */}
              <div className='w-full flex gap-2 mt-4'>
                <button
                  className="bg-green-500 hover:bg-green-700 text-black px-4 py-2 rounded-md w-full flex items-center justify-center"
                  onClick={guardarNuevoProveedor}
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
                        setMostrarAgregarProveedor(false);
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

        {/* Tabla de proveedores */}
        <table className="min-w-full table-auto">
          <thead>
            <tr className="text-gray-100 uppercase text-sm leading-normal border-b border-gray-200">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Teléfono</th>
          <th className="py-3 px-6 text-left">Correo</th>
          <th className="py-3 px-6 text-left">Dirección</th>
          <th className="py-3 px-6 text-left">Acciones</th>
        </tr>
      </thead>
      <tbody className="text-gray-200 text-sm font-light">
        {proveedoresFiltrados.map((proveedor) => (
          <tr key={proveedor.id} className="border-b border-gray-200 hover:bg-secondary-100">
            <td className="py-3 px-6 text-left whitespace-nowrap">{proveedor.id}</td>
            <td className="py-3 px-6 text-left">{proveedor.nombre}</td>
            <td className="py-3 px-6 text-left">{proveedor.telefono}</td>
            <td className="py-3 px-6 text-left">{proveedor.correo}</td>
            <td className="py-3 px-6 text-left">{proveedor.direccion}</td>
            <td className="py-3 px-6 text-left">
              {/* Botón de Editar */}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleEditarProveedor(proveedor)}
              >
                <FaEdit/>
              </button>
              {/* Botón de Eliminar */}
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={handleEliminarProveedor}
              >
                <FaTrash/>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  {mostrarEditarProveedor && (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute w-full h-full bg-gray-900 opacity-70"></div>
      <div className="bg-secondary-100 p-8 rounded-lg flex flex-col relative z-10">
        <h2 className="text-2xl font-bold mb-4 ">Editar Proveedor</h2>
        {/* Campos de entrada para editar proveedor */}
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre"
            className="border bg-secondary-900 border-secondary-900  text-white rounded-md px-3 py-2 w-full"
            value={proveedorAEditar.nombre}
            onChange={(e) => setProveedorAEditar({ ...proveedorAEditar, nombre: e.target.value })}
          />
          <input
            type="text"
            placeholder="Teléfono"
            className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 w-full"
            value={proveedorAEditar.telefono}
            onChange={(e) => setProveedorAEditar({ ...proveedorAEditar, telefono: e.target.value })}
          />
          <input
            type="text"
            placeholder="Correo"
            className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 w-full"
            value={proveedorAEditar.correo}
            onChange={(e) => setProveedorAEditar({ ...proveedorAEditar, correo: e.target.value })}
          />
          <input
            type="text"
            placeholder="Dirección"
            className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 w-full"
            value={proveedorAEditar.direccion}
            onChange={(e) => setProveedorAEditar({ ...proveedorAEditar, direccion: e.target.value })}
          />
        </div>
        {/* Botones de guardar y cancelar */}
        <div className='w-full flex gap-2 mt-4'>
          <button
            className="bg-green-500 hover:bg-green-700 text-black px-4 py-2 rounded-md w-full flex items-center justify-center"
            onClick={() => {
              Swal.fire({
                icon: 'success',
                title: 'Proveedor Actualizado',
                text: 'El proveedor se ha actualizado exitosamente.',
              });
              setMostrarEditarProveedor(false);
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
                  setMostrarEditarProveedor(false);
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

export default Proveedores;