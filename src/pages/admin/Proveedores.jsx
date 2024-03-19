import React, { useState } from 'react';

// Icons
import { FaSave, FaEdit, FaTrash } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

const Proveedores = () => {
  const [mostrarAgregarProveedor, setmostrarAgregarProveedor] = useState(false);

  const desplegarVentanaProveedor = () => {
    setmostrarAgregarProveedor(!mostrarAgregarProveedor);
  };

  const proveedores = [
    {
      id: 1,
      nombre: 'Proveedor 1',
      telefono: '123-456-7890',
      correo: 'proveedor1@example.com',
      direccion: 'Calle 123, Ciudad, País',
    },
    {
      id: 2,
      nombre: 'Proveedor 2',
      telefono: '987-654-3210',
      correo: 'proveedor2@example.com',
      direccion: 'Avenida XYZ, Ciudad, País',
    },
  ];

  return (
    <div className="overflow-x-auto">
      <div className="w-full py-5 flex items-center justify-start md:justify-end">
        <button
          className="bg-primary text-secondary-900 py-2 px-4 rounded-[10px]"
          onClick={desplegarVentanaProveedor}
        >
          Agregar nuevo producto
        </button>
      </div>

      {mostrarAgregarProveedor && (
        <div className="fixed top-1 flex items-center justify-center w-[78%] h-full">
          <div className="bg-secondary-100 p-8 rounded-lg flex flex-col">
            <h2 className="text-2xl font-bold mb-4 ">Agregar Nuevo Proveedor</h2>
            <input
              type="text"
              placeholder="Nombre"
              className="border bg-secondary-900 border-secondary-900  text-white rounded-md px-3 py-2 mb-4 w-full"
            />
            <input
              type="text"
              placeholder="Teléfono"
              className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 mb-4 w-full"
            />
            <input
              type="text"
              placeholder="Correo"
              className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 mb-4 w-full"
            />
            <input
              type="text"
              placeholder="Dirección"
              className="border bg-secondary-900 border-secondary-900 text-white rounded-md px-3 py-2 mb-4 w-full"
            />
            <div className='w-full flex gap-2'>
            <button
              className="bg-green-500 hover:bg-green-700 text-black px-4 py-2 rounded-md w-full flex items-center justify-center"
              onClick={desplegarVentanaProveedor}
            >
              <FaSave/>
            </button>
            <button
              className="text-black bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md w-full flex items-center justify-center"
              onClick={desplegarVentanaProveedor}
            >
              <IoMdCloseCircle/>
            </button>
            </div>
          </div>
        </div>
      )}

      <table className="min-w-full table-auto">
        <thead>
          <tr className=" text-gray-100 uppercase text-sm leading-normal border-b border-gray-200">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Nombre</th>
            <th className="py-3 px-6 text-left">Teléfono</th>
            <th className="py-3 px-6 text-left">Correo</th>
            <th className="py-3 px-6 text-left">Dirección</th>
            <th className="py-3 px-6 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-200 text-sm font-light">
          {proveedores.map((proveedor) => (
            <tr key={proveedor.id} className="border-b border-gray-200 hover:bg-secondary-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{proveedor.id}</td>
              <td className="py-3 px-6 text-left">{proveedor.nombre}</td>
              <td className="py-3 px-6 text-left">{proveedor.telefono}</td>
              <td className="py-3 px-6 text-left">{proveedor.correo}</td>
              <td className="py-3 px-6 text-left">{proveedor.direccion}</td>
              <td className="py-3 px-6 text-left">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  <FaEdit/>
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                  <FaTrash/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Proveedores;
