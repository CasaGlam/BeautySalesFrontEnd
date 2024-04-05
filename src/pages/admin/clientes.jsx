import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Clientes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [clientes] = useState([
    { nombre: "Cliente Uno", telefono: "123456789", correo: "cliente1@example.com" },
    { nombre: "Cliente Dos", telefono: "987654321", correo: "cliente2@example.com" },
    { nombre: "Cliente Tres", telefono: "456789123", correo: "cliente3@example.com" },
    { nombre: "Cliente Cuatro", telefono: "789123456", correo: "cliente4@example.com" },
    { nombre: "Cliente Cinco", telefono: "321654987", correo: "cliente5@example.com" },
    { nombre: "Cliente Seis", telefono: "654987321", correo: "cliente6@example.com" },
    { nombre: "Cliente Siete", telefono: "987321654", correo: "cliente7@example.com" }
  ]);
  const itemsPerPage = 5;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Resetear a la primera página al buscar
  };

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredClientes.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (nombre) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás deshacer esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes agregar la lógica para eliminar el cliente con el nombre proporcionado
        Swal.fire(
          '¡Eliminado!',
          'El cliente ha sido eliminado',
          'success'
        );
      }
    });
  };

  return (
    <div className="flex justify-center">
      <div className='bg-secondary-100 w-full rounded-lg'>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6  p-8">
          <div>
            <h1 className="text-2xl font-bold mb-4 pt-4">Registro de clientes</h1>
          </div>
          <div className="flex gap-4">
            <div>
              <input
                className="w-full px-2 py-2 rounded-lg pl-4 placeholder-black text-black"
                type="search"
                placeholder="Buscar cliente"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="">
              <Link to="/clientes/registrar-cliente"> {/* Enlace para agregar nuevo cliente */}
                <button className="w-full px-4 py-2 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold">
                  Agregar nuevo cliente
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className='p-5 overflow-x-auto rounded-lg'>
          <table className="min-w-full divide-y divide-gray-500 rounded-lg">
            <thead className="bg-secondary-900 rounded-lg">
              <tr className=''>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Teléfono
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Correo electrónico
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-300 divide-y divide-black rounded-lg">
              {currentItems.map((cliente, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-black">{cliente.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">{cliente.telefono}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">{cliente.correo}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex">
                    <Link to={`/clientes/editar-cliente`}> {/* Enlace para editar cliente */}
                      <FaEdit className="text-blue-500 hover:text-blue-700 transition-colors mr-2 cursor-pointer" />
                    </Link>
                    <FaTrash className="text-red-500 hover:text-red-700 transition-colors cursor-pointer" onClick={() => handleDelete(cliente.nombre)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Paginación */}
        <div className="flex justify-center mt-4">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <IoIosArrowBack/>
            </button>
            {Array.from(
              { length: Math.ceil(filteredClientes.length / itemsPerPage) },
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
              disabled={currentPage === Math.ceil(filteredClientes.length / itemsPerPage)}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <IoIosArrowForward/>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Clientes;
