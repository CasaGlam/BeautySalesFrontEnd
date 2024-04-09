import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Swal from 'sweetalert2';

const Usuarios = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [usuariosFromApi, setUsuariosFromApi] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/usuarios')
      .then(response => response.json())
      .then(data => {
        if (data && data.usuarios && Array.isArray(data.usuarios)) {
          setUsuariosFromApi(data.usuarios);
        } else {
          console.error('Datos de usuario no encontrados en la respuesta:', data);
        }
      })
      .catch(error => console.error('Error fetching usuarios:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredUsuarios = usuariosFromApi.filter(
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

  const handleDeleteUser = (userId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Deseas eliminar este usuario?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8080/api/usuarios/${userId}`, {
          method: "DELETE"
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Error al eliminar el usuario');
            }
            return response.json();
          })
          .then(() => {
            Swal.fire(
              'Éxito!',
              'El usuario se ha eliminado exitosamente.',
              'success'
            ).then(() => {
              // Recargar la lista de usuarios después de la eliminación
              window.location.reload();
            });
          })
          .catch((error) => {
            Swal.fire(
              'Error!',
              error.message || 'Hubo un error al eliminar el usuario.',
              'error'
            );
          });
      }
    });
  };

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
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${usuario.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {usuario.estado ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/usuarios/editar-usuario/${usuario._id}`}>
                      <button className="text-black border border-black p-2 rounded-lg mr-2 hover:bg-black hover:text-white transition-colors">
                        <MdEdit />
                      </button>
                    </Link>
                    <button 
                      className="text-black border border-black p-2 rounded-lg hover:bg-black hover:text-white transition-colors"
                      onClick={() => handleDeleteUser(usuario._id)}
                    >
                      {/*Eliminar usuario */}
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
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default Usuarios;
