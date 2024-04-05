import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Proveedores = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [proveedores] = useState([
    { nombre: "Proveedor Uno", telefono: "123456789", correo: "proveedor1@example.com", direccion: "Calle 123, Ciudad Uno" },
    { nombre: "Proveedor Dos", telefono: "987654321", correo: "proveedor2@example.com", direccion: "Avenida 456, Ciudad Dos" },
    { nombre: "Proveedor Tres", telefono: "555555555", correo: "proveedor3@example.com", direccion: "Plaza Principal, Ciudad Tres" },
    { nombre: "Proveedor Cuatro", telefono: "444444444", correo: "proveedor4@example.com", direccion: "Calle 789, Ciudad Cuatro" },
    { nombre: "Proveedor Cinco", telefono: "333333333", correo: "proveedor5@example.com", direccion: "Bulevar X, Ciudad Cinco" },
    { nombre: "Proveedor Seis", telefono: "222222222", correo: "proveedor6@example.com", direccion: "Avenida Z, Ciudad Seis" },
    { nombre: "Proveedor Siete", telefono: "111111111", correo: "proveedor7@example.com", direccion: "Calle Y, Ciudad Siete" }
  ]);
  const itemsPerPage = 5;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Resetear a la primera página al buscar
  };

  const filteredProveedores = proveedores.filter((proveedor) =>
    proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProveedores.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
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
        // Aquí puedes agregar la lógica para eliminar el proveedor con el id proporcionado
        Swal.fire(
          '¡Eliminado!',
          'El proveedor ha sido eliminado',
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
            <h1 className="text-2xl font-bold mb-4 pt-4">Registro de proveedores</h1>
          </div>
          <div className="flex gap-4">
            <div>
              <input
                className="w-full px-2 py-2 rounded-lg pl-4 placeholder-black text-black"
                type="search"
                placeholder="Buscar proveedor"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="">
              <Link to="/proveedores/registrar-proveedor">
                <button className="w-full px-4 py-2 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold">
                  Agregar nuevo proveedor
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
                  Correo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Dirección
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-300 divide-y divide-black rounded-lg">
              {currentItems.map((proveedor, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-black">{proveedor.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">{proveedor.telefono}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">{proveedor.correo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">{proveedor.direccion}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex">
                    <Link to={`/proveedores/editar-proveedor`}>
                      <FaEdit className="text-blue-500 hover:text-blue-700 transition-colors mr-2 cursor-pointer" />
                    </Link>
                    <FaTrash className="text-red-500 hover:text-red-700 transition-colors cursor-pointer" onClick={() => handleDelete(index)} />
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
              { length: Math.ceil(filteredProveedores.length / itemsPerPage) },
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
              disabled={currentPage === Math.ceil(filteredProveedores.length / itemsPerPage)}
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

export default Proveedores;
