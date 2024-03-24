import React, { useState } from 'react';
import { FaSearch, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import Swal from 'sweetalert2';

const Clientes = () => {
  const [mostrarAgregarCliente, setMostrarAgregarCliente] = useState(false);
  const [mostrarEditarCliente, setMostrarEditarCliente] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [clienteAEditar, setClienteAEditar] = useState(null);
  const [nuevoCliente, setNuevoCliente] = useState({
    id: '',
    nombre: '',
    telefono: '',
    correo: ''
  });

  const desplegarVentanaCliente = () => {
    setMostrarAgregarCliente(!mostrarAgregarCliente);
  };

  const guardarNuevoCliente = () => {
    if (!nuevoCliente.id || !nuevoCliente.nombre || !nuevoCliente.telefono || !nuevoCliente.correo) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
      });
      return;
    }

    // Aquí puedes agregar lógica para guardar el nuevo cliente
    Swal.fire({
      icon: 'success',
      title: 'Cliente Guardado',
      text: 'El cliente se ha guardado exitosamente.',
    });
    setMostrarAgregarCliente(false);
  };

  const handleEditarCliente = (cliente) => {
    setClienteAEditar(cliente);
    setMostrarEditarCliente(true);
  };

  const handleEliminarCliente = (clienteId) => {
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar este cliente.',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const clientesActualizados = clientes.filter(cliente => cliente.id !== clienteId);
        setClientes(clientesActualizados);
        Swal.fire(
          'Eliminado',
          'El cliente ha sido eliminado correctamente.',
          'success'
        );
      }
    });
  };

  const handleBuscar = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setBusqueda(searchTerm);
    const filteredClientes = clientes.filter((cliente) =>
      cliente.nombre.toLowerCase().includes(searchTerm)
    );
    setClientesFiltrados(filteredClientes);
  };

  const clientes = [
    {
      id: 1,
      nombre: 'Cliente 1',
      telefono: '123456789',
      correo: 'cliente1@example.com',
    },
    {
      id: 2,
      nombre: 'Cliente 2',
      telefono: '987654321',
      correo: 'cliente2@example.com',
    },
  ];

  return (
    <div className={`overflow-x-auto ${mostrarAgregarCliente || mostrarEditarCliente ? 'blur-background' : 'no-blur-background'}`}>
      <div className="bg-secondary-100 w-full rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mr-4">Registrar Clientes</h1>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={busqueda}
              onChange={handleBuscar}
              className="py-2 px-4 rounded-md mr-4"
            />
            <button
              className="bg-primary text-secondary-900 py-2 px-4 rounded-[10px]"
              onClick={desplegarVentanaCliente}
            >
              Agregar Cliente
            </button>
          </div>
        </div>

        {mostrarAgregarCliente && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="absolute w-full h-full bg-gray-900 opacity-70"></div>
            <div className="bg-secondary-100 p-8 rounded-lg flex flex-col relative z-10">
              <h2 className="text-2xl font-bold mb-4 ">Agregar Nuevo Cliente</h2>
              {/* Campos de entrada para agregar cliente */}
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="ID"
                  className="border bg-secondary-900 border-secondary-900  text-white rounded-md px-3 py-2 w-full"
                  value={nuevoCliente.id}
                  onChange={(e) => setNuevoCliente({ ...nuevoCliente, id: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Nombre"
                  className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 w-full"
                  value={nuevoCliente.nombre}
                  onChange={(e) => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Teléfono"
                  className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 w-full"
                  value={nuevoCliente.telefono}
                  onChange={(e) => setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Correo"
                  className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 w-full"
                  value={nuevoCliente.correo}
                  onChange={(e) => setNuevoCliente({ ...nuevoCliente, correo: e.target.value })}
                />
              </div>
              {/* Botones de guardar y cancelar */}
              <div className='w-full flex gap-2 mt-4'>
                <button
                  className="bg-green-500 hover:bg-green-700 text-black px-4 py-2 rounded-md w-full flex items-center justify-center"
                  onClick={guardarNuevoCliente}
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
                        setMostrarAgregarCliente(false);
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

        {/* Tabla de clientes */}
        <table className="min-w-full table-auto">
          <thead>
            <tr className="text-gray-100 uppercase text-sm leading-normal border-b border-gray-200">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Teléfono</th>
              <th className="py-3 px-6 text-left">Correo</th>
              <th className="py-3 px-6 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-200 text-sm font-light">
            {clientesFiltrados.map((cliente) => (
              <tr key={cliente.id} className="border-b border-gray-200 hover:bg-secondary-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{cliente.id}</td>
                <td className="py-3 px-6 text-left">{cliente.nombre}</td>
                <td className="py-3 px-6 text-left">{cliente.telefono}</td>
                <td className="py-3 px-6 text-left">{cliente.correo}</td>
                <td className="py-3 px-6 text-left">
                  {/* Botón de Editar */}
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleEditarCliente(cliente)}
                  >
                    <FaEdit/>
                  </button>
                  {/* Botón de Eliminar */}
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={handleEliminarCliente}
                  >
                    <FaTrash/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {mostrarEditarCliente && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="absolute w-full h-full bg-gray-900 opacity-70"></div>
          <div className="bg-secondary-100 p-8 rounded-lg flex flex-col relative z-10">
            <h2 className="text-2xl font-bold mb-4 ">Editar Cliente</h2>
            {/* Campos de entrada para editar cliente */}
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="ID"
                className="border bg-secondary-900 border-secondary-900  text-white rounded-md px-3 py-2 w-full"
                value={clienteAEditar.id}
                onChange={(e) => setClienteAEditar({ ...clienteAEditar, id: e.target.value })}
              />
              <input
                type="text"
                placeholder="Nombre"
                className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 w-full"
                value={clienteAEditar.nombre}
                onChange={(e) => setClienteAEditar({ ...clienteAEditar, nombre: e.target.value })}
              />
              <input
                type="text"
                placeholder="Teléfono"
                className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 w-full"
                value={clienteAEditar.telefono}
                onChange={(e) => setClienteAEditar({ ...clienteAEditar, telefono: e.target.value })}
              />
              <input
                type="text"
                placeholder="Correo"
                className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 w-full"
                value={clienteAEditar.correo}
                onChange={(e) => setClienteAEditar({ ...clienteAEditar, correo: e.target.value })}
              />
            </div>
            {/* Botones de guardar y cancelar */}
            <div className='w-full flex gap-2 mt-4'>
              <button
                className="bg-green-500 hover:bg-green-700 text-black px-4 py-2 rounded-md w-full flex items-center justify-center"
                onClick={() => {
                  Swal.fire({
                    icon: 'success',
                    title: 'Cliente Actualizado',
                    text: 'El cliente se ha actualizado exitosamente.',
                  });
                  setMostrarEditarCliente(false);
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
                      setMostrarEditarCliente(false);
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

export default Clientes;