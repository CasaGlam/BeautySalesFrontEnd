import React, { useState } from "react";

// Icons
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FaTrash, FaCheck } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";

const Roles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rolesPerPage] = useState(5);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const openPermissionsModal = (role) => {
    setSelectedRole(role);
  };

  const closePermissionsModal = () => {
    setSelectedRole(null);
  };

  const Roles = [
    {
      nombre: "Administrador",
      dashboard: true,
      productos: true,
      categorias: true,
      compras: true,
      ventas: true,
      proveedores: true,
      clientes: true,
      usuarios: true,
      roles: true,
      fecha: "5/04/2024",
      estado: true,
    },
    {
      nombre: "Empleado",
      dashboard: true,
      productos: false,
      categorias: true,
      compras: false,
      ventas: true,
      proveedores: false,
      clientes: true,
      usuarios: false,
      roles: true,
      fecha: "5/04/2024",
      estado: true,
    },
  ];

  const filteredRoles = Roles.filter((rol) =>
    rol.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * rolesPerPage;
  const indexOfFirstUser = indexOfLastUser - rolesPerPage;
  const currentUsers = filteredRoles.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
        <div>
          <h1 className="text-2xl font-bold mb-4 pt-4">Registro de Roles</h1>
        </div>
        <div className="flex flex-col gap-4 md:flex-row ">
          <div>
            <input
              className="w-full px-2 py-2 rounded-lg pl-4 placeholder-black text-black"
              type="search"
              placeholder="Buscar rol"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="">
            <Link to="/roles/registrar-rol" className="">
              <button className="w-full px-4 py-2 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold">
                Agregar nuevo rol
              </button>
            </Link>
          </div>
        </div>
      </div>

      {filteredRoles.length === 0 ? (
      <div className="text-xl text-center text-gray-500">No se encuentran roles.</div>
    ) : (
      <div className="p-5 overflow-x-auto rounded-lg">
        <table className="min-w-full divide-y divide-gray-500 rounded-lg ">
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
                Permisos
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Fecha de creación
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
            {currentUsers.map((rol, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-black">{rol.nombre}</div>
                </td>
                <td>
                <button
                    onClick={() => openPermissionsModal(rol)}
                    className="text-black border border-black p-2 rounded-lg  hover:bg-black hover:text-white transition-colors"
                  >
                    Ver permisos
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-black">06/04/2024</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to="/roles/editar-rol">
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
          <IoIosArrowBack />
        </button>
        {Array.from(
          { length: Math.ceil(filteredRoles.length / rolesPerPage) },
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
          disabled={
            currentPage === Math.ceil(filteredRoles.length / rolesPerPage)
          }
          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-primary hover:text-white transition-colors"
        >
          <IoIosArrowForward />
        </button>
      </div>

      {selectedRole && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            ></span>
            &#8203;
            <div
              className="inline-block align-bottom bg-secondary-100 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 text-white font-bold mb-4"
                    id="modal-headline"
                  >
                    Permisos de {selectedRole.nombre}
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    <div className="w-full sm:w-1/2">
                      <strong>Dashboard:</strong>{" "}
                      {selectedRole.dashboard ? "Sí" : "No"}
                    </div>
                    <div className="w-full sm:w-1/2">
                      <strong>Productos:</strong>{" "}
                      {selectedRole.productos ? "Sí" : "No"}
                    </div>
                    <div className="w-full sm:w-1/2">
                      <strong>Categorias:</strong>{" "}
                      {selectedRole.categorias ? "Sí" : "No"}
                    </div>
                    <div className="w-full sm:w-1/2">
                      <strong>Compras:</strong>{" "}
                      {selectedRole.compras ? "Sí" : "No"}
                    </div>
                    <div className="w-full sm:w-1/2">
                      <strong>Ventas:</strong>{" "}
                      {selectedRole.ventas ? "Sí" : "No"}
                    </div>
                    <div className="w-full sm:w-1/2">
                      <strong>Proveedores:</strong>{" "}
                      {selectedRole.proveedores ? "Sí" : "No"}
                    </div>
                    <div className="w-full sm:w-1/2">
                      <strong>Clientes:</strong>{" "}
                      {selectedRole.clientes ? "Sí" : "No"}
                    </div>
                    <div className="w-full sm:w-1/2">
                      <strong>Usuarios:</strong>{" "}
                      {selectedRole.usuarios ? "Sí" : "No"}
                    </div>
                    <div className="w-full sm:w-1/2">
                      <strong>Roles:</strong>{" "}
                      {selectedRole.roles ? "Sí" : "No"}
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    onClick={closePermissionsModal}
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:text-sm"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roles;