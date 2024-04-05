import React, { useState } from "react";

// Icons
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";

const Usuarios = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const usuarios = [
    {
      nombre: "Santiago",
      correo: "santi@gmail.com",
      rol: "Administrador",
      fecha: "5/04/2024",
      estado: true,
    },
    {
      nombre: "María",
      correo: "maria@gmail.com",
      rol: "Usuario",
      fecha: "6/04/2024",
      estado: false,
    },
    {
      nombre: "Pedro",
      correo: "pedro@gmail.com",
      rol: "Administrador",
      fecha: "7/04/2024",
      estado: true,
    },
    {
      nombre: "Ana",
      correo: "ana@gmail.com",
      rol: "Usuario",
      fecha: "8/04/2024",
      estado: false,
    },
    {
      nombre: "Juan",
      correo: "juan@gmail.com",
      rol: "Administrador",
      fecha: "9/04/2024",
      estado: true,
    },
    {
      nombre: "Laura",
      correo: "laura@gmail.com",
      rol: "Usuario",
      fecha: "10/04/2024",
      estado: false,
    },
    {
      nombre: "Diego",
      correo: "diego@gmail.com",
      rol: "Administrador",
      fecha: "11/04/2024",
      estado: true,
    },
    {
      nombre: "Lucía",
      correo: "lucia@gmail.com",
      rol: "Usuario",
      fecha: "12/04/2024",
      estado: false,
    },
    {
      nombre: "Carlos",
      correo: "carlos@gmail.com",
      rol: "Administrador",
      fecha: "13/04/2024",
      estado: true,
    },
    {
      nombre: "Elena",
      correo: "elena@gmail.com",
      rol: "Usuario",
      fecha: "14/04/2024",
      estado: false,
    },
    {
      nombre: "Miguel",
      correo: "miguel@gmail.com",
      rol: "Administrador",
      fecha: "15/04/2024",
      estado: true,
    },
    {
      nombre: "Fernanda",
      correo: "fernanda@gmail.com",
      rol: "Usuario",
      fecha: "16/04/2024",
      estado: false,
    },
    {
      nombre: "Andrés",
      correo: "andres@gmail.com",
      rol: "Administrador",
      fecha: "17/04/2024",
      estado: true,
    },
    {
      nombre: "Valeria",
      correo: "valeria@gmail.com",
      rol: "Usuario",
      fecha: "18/04/2024",
      estado: false,
    },
    {
      nombre: "Martín",
      correo: "martin@gmail.com",
      rol: "Administrador",
      fecha: "19/04/2024",
      estado: true,
    },
    {
      nombre: "Camila",
      correo: "camila@gmail.com",
      rol: "Usuario",
      fecha: "20/04/2024",
      estado: false,
    },
    {
      nombre: "Luis",
      correo: "luis@gmail.com",
      rol: "Administrador",
      fecha: "21/04/2024",
      estado: true,
    },
    {
      nombre: "Julia",
      correo: "julia@gmail.com",
      rol: "Usuario",
      fecha: "22/04/2024",
      estado: false,
    },
    {
      nombre: "Gabriel",
      correo: "gabriel@gmail.com",
      rol: "Administrador",
      fecha: "23/04/2024",
      estado: true,
    },
    {
      nombre: "Natalia",
      correo: "natalia@gmail.com",
      rol: "Usuario",
      fecha: "24/04/2024",
      estado: false,
    },
  ];

  const filteredUsuarios = usuarios.filter(
    (usuario) =>
      usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.correo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsuarios.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
        <div>
          <h1 className="text-2xl font-bold mb-4 pt-4">Registro de usuarios</h1>
        </div>
        <div className="flex flex-col gap-4 md:flex-row ">
          <div>
            <input
              className="w-full px-2 py-2 rounded-lg pl-4 placeholder-black text-black"
              type="search"
              placeholder="Buscar usuario"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="">
            <Link to="/usuarios/registrar-usuario" className="">
              <button className="w-full px-4 py-2 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold">
                Agregar nuevo usuario
              </button>
            </Link>
          </div>
        </div>
      </div>

      {filteredUsuarios.length === 0 ? (
      <div className="text-xl text-center text-gray-500">No se encuentran usuarios.</div>
    ) : (
      <div className="p-5 overflow-x-auto rounded-lg">
        <table className="min-w-full divide-y divide-gray-500 rounded-lg">
          <thead className="bg-secondary-900 rounded-lg ">
            <tr className="">
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Nombre
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Correo
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Rol
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Fecha
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Estado
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-300 divide-y divide-black rounded-lg">
            {/* Renderizar usuarios actuales */}
            {currentUsers.map((usuario, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-black">{usuario.nombre}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-black">{usuario.correo}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-black">{usuario.rol}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-black">{usuario.fecha}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${usuario.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {usuario.estado ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to="/usuarios/editar-usuario">
                    <button className="text-black border border-black p-2 rounded-lg mr-2 hover:bg-black hover:text-white transition-colors">
                      <MdEdit />
                    </button>
                  </Link>
                  <button className="text-black border border-black p-2 rounded-lg hover:bg-black hover:text-white transition-colors">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

      <div className="flex justify-center mt-4">
  <button
    onClick={() => paginate(currentPage - 1)}
    disabled={currentPage === 1}
    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-primary hover:text-white transition-colors"
  >
    <IoIosArrowBack/>
  </button>
  {Array.from(
    { length: Math.ceil(filteredUsuarios.length / usersPerPage) },
    (_, i) => (
      <button
        key={i}
        onClick={() => paginate(i + 1)}
        className={`${
          currentPage === i + 1
            ? "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary text-sm font-medium text-white hover:bg-opacity-[80%]"
            : "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        }`}
      >
        {i + 1}
      </button>
    )
  )}
  <button
    onClick={() => paginate(currentPage + 1)}
    disabled={currentPage === Math.ceil(filteredUsuarios.length / usersPerPage)}
    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-primary hover:text-white transition-colors"
  >
    <IoIosArrowForward/>
  </button>
</div>

    </div>
  );
};

export default Usuarios;
