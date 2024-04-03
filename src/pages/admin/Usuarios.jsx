import React from "react";
import { Link } from "react-router-dom";

// Icons
import { FaSearch } from "react-icons/fa";

const Usuarios = () => {
  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
        <div>
          <h1 className="text-2xl font-bold mb-4 pt-4">Registro de usuarios</h1>
        </div>
        <div className="flex gap-4">
          <div>
            <input
              className="w-full px-2 py-2 rounded-lg pl-4 placeholder-black text-black"
              type="search"
              placeholder="Buscar usuario"
            />
          </div>
          <div className="">
          <Link
                to="/usuarios/registrar-usuario"
                className=""
              >
            <button  className="w-full px-4 py-2 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold">
              Agregar nuevo usuario
            </button>
              </Link>

          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-secondary-200 text-white">
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Correo</th>
              <th className="px-4 py-2">Rol</th>
              <th className="px-4 py-2">Fecha de Creación</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-secondary-100 text-white  border-y hover:bg-[#525252]">
              <td className=" px-4 py-2 text-center">John Doe</td>
              <td className=" px-4 py-2 text-center">john.doe@example.com</td>
              <td className=" px-4 py-2 text-center">Admin</td>
              <td className=" px-4 py-2 text-center">2024-04-01</td>
              <td className=" px-4 py-2 text-center">
              <Link
                to="/usuarios/editar-usuario"
                className=""
              >
                <button className="bg-blue-500 hover:bg-blue-700 transition-colors text-white font-bold py-2 px-4 rounded mr-2">
                  Editar
                </button>
                </Link>
                <button className="bg-red-500 hover:bg-red-700 transition-colors text-white font-bold py-2 px-4 rounded">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Usuarios;
