import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Roles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rolesPerPage] = useState(5);
  const [selectedRole, setSelectedRole] = useState(null);
  const [rolesData, setRolesData] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = () => {
    fetch("http://localhost:8080/api/roles")
      .then((response) => response.json())
      .then((data) => {
        setRolesData(data.roles);
      })
      .catch((error) => console.error("Error fetching roles:", error));
  };

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

  const handleDelete = (roleId, roleName) => {
    // Verificar si el rol es el "SUPER ADMINISTRADOR"
    if (roleName === "SUPER ADMINISTRADOR") {
      MySwal.fire(
        'Error!',
        'No se puede eliminar al SUPER ADMINISTRADOR.',
        'error'
      );
      return; // Evitar que se continúe con la eliminación
    }
  
    // Verificar si hay usuarios asignados a este rol
    fetch('http://localhost:8080/api/usuarios')
      .then(response => response.json())
      .then(data => {
        const usersAssignedToRole = data.usuarios.filter(usuario => usuario.rol === roleName);
        if (usersAssignedToRole.length > 0) {
          MySwal.fire(
            'Error!',
            'No se puede eliminar el rol porque hay usuarios asignados a él.',
            'error'
          );
          return; // Evitar que se continúe con la eliminación
        }
  
        // Si no hay usuarios asignados al rol, proceder con la eliminación
        MySwal.fire({
          title: "¿Estás seguro?",
          text: "Esta acción no se puede revertir",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            // Si el usuario confirma la eliminación, enviar la solicitud DELETE
            fetch(`http://localhost:8080/api/roles/${roleId}`, {
              method: "DELETE",
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Error deleting role");
                }
                return response.json();
              })
              .then(() => {
                // Recargar roles después de eliminar
                fetchRoles();
                // Mostrar alerta de éxito
                MySwal.fire({
                  icon: "success",
                  title: "Eliminado con éxito",
                  timer: 2000,
                  showConfirmButton: false,
                });
              })
              .catch((error) => {
                console.error("Error deleting role:", error.message);
                // Mostrar alerta de error
                MySwal.fire({
                  icon: "error",
                  title: "Error al eliminar",
                  text: error.message,
                });
              });
          }
        });
      })
      .catch(error => {
        console.error('Error fetching usuarios:', error);
        // Mostrar alerta de error
        MySwal.fire({
          icon: "error",
          title: "Error al obtener la lista de usuarios",
          text: "Hubo un error al obtener la lista de usuarios.",
        });
      });
  };
  
  

  const allPermissions = [
    "dashboard",
    "productos",
    "categorias",
    "compras",
    "ventas",
    "proveedores",
    "clientes",
    "usuarios",
    "roles",
  ];

  const getPermissionStatus = (permission) => {
    return selectedRole && selectedRole.permisos.includes(permission)
      ? "Sí"
      : "No";
  };

  const filteredRoles = rolesData.filter((rol) =>
    rol.rol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * rolesPerPage;
  const indexOfFirstUser = indexOfLastUser - rolesPerPage;
  const currentUsers = filteredRoles.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
        <div>
          <h1 className="text-2xl font-bold mb-4 pt-4 text-texto-100">Listado de roles</h1>
        </div>
        <div className="flex flex-col gap-4 md:flex-row mr-5">
          <div>
            <input
              className="w-full px-2 py-2 rounded-lg pl-4 placeholder-black text-black bg-secondary-900"
              type="search"
              placeholder="Buscar"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="">
            <Link to="/roles/registrar-rol" className="">
              <button className="w-full px-4 py-2 rounded-lg bg-primary text-texto-900 hover:bg-opacity-[80%] transition-colors font-bold">
                Agregar
              </button>
            </Link>
          </div>
        </div>
      </div>

      {filteredRoles.length === 0 ? (
        <div className="text-xl text-center text-gray-500">
          No se encuentran roles.
        </div>
      ) : (
        <div className="p-5 overflow-x-auto rounded-lg">
          <table className="min-w-full divide-y divide-gray-500 rounded-lg ">
            <thead className="bg-secondary-900 rounded-lg ">
              <tr className="">
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider"
                >
                  Nombre
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider"
                >
                  Permisos
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-300 divide-y divide-black rounded-lg">
              {currentUsers.map((rol, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-black">{rol.rol}</div>
                  </td>
                  <td>
                    <button
                      onClick={() => openPermissionsModal(rol)}
                      className="text-black border border-black p-2 rounded-lg  hover:bg-black hover:text-texto-900 transition-colors"
                    >
                      Ver permisos
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/roles/editar-rol/${rol._id}`}>
                      <button className="text-black border-none p-1 rounded-lg mr-2 hover:bg-black hover:text-texto-900 transition-colors">
                        <MdEdit />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(rol._id, rol.rol)}
                      className="text-black border-none p-1 rounded-lg hover:bg-black hover:text-texto-900 transition-colors"
                    >
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
          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-primary hover:text-texto-900 transition-colors"
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
                  ? "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary text-sm font-medium text-texto-900 hover:bg-opacity-[80%]"
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
          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-primary hover:text-texto-900 transition-colors"
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
                    className="text-lg leading-6 text-texto-100 font-bold mb-4"
                    id="modal-headline"
                  >
                    Permisos de {selectedRole.rol}
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {allPermissions.map((permission) => (
                      <div key={permission} className="w-full sm:w-1/2 text-texto-100">
                        <strong className="text-gray-500">{permission}:</strong>{" "}
                        {getPermissionStatus(permission)}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    onClick={closePermissionsModal}
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-texto-900 hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:text-sm"
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
