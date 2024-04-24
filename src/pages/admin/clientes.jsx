import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Swal from "sweetalert2";

const Clientes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/clientes')
      .then(response => response.json())
      .then(data => {
        if (data && data.clientes && Array.isArray(data.clientes)) {
          setClientes(data.clientes);
          setLoading(false);
        } else {
          console.error('Datos de clientes no encontrados en la respuesta:', data);
        }
      })
      .catch(error => console.error('Error fetching clientes:', error));
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    // Validar que el valor ingresado contenga solo letras
    if (/^[A-Za-z\s]+$/.test(value) || value === '') {
      setSearchTerm(value);
      setCurrentPage(1); // Resetear a la primera página al buscar
    }
  };

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredClientes.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    // Consultar la API de ventas para verificar si el cliente está relacionado con alguna venta
    fetch(`http://localhost:8080/api/ventas/cliente/${id}`)
      .then(response => {
        if (response.ok) {
          // Si la consulta es exitosa, verificar si hay alguna venta relacionada con el cliente
          return response.json();
        }
        throw new Error('Error al consultar las ventas relacionadas con el cliente');
      })
      .then(data => {
        // Si hay ventas relacionadas, mostrar una alerta y evitar la eliminación
        if (data && data.ventasRelacionadas && data.ventasRelacionadas.length > 0) {
          Swal.fire({
            icon: 'error',
            title: 'Cliente relacionado con una venta',
            text: 'Este cliente no se puede eliminar porque está relacionado con una venta.'
          });
        } else {
          // Si no hay ventas relacionadas, proceder con la eliminación del cliente
          confirmDelete(id);
        }
      })
      .catch(error => {
        console.error('Error al verificar las ventas relacionadas con el cliente:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al verificar las ventas relacionadas con el cliente. Por favor, inténtalo de nuevo más tarde.'
        });
      });
  };
  
  const confirmDelete = (id) => {
    // Mostrar la confirmación de eliminación solo si no hay ventas relacionadas con el cliente
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
        // Si se confirma la eliminación, realizar la solicitud de eliminación del cliente
        deleteCliente(id);
      }
    });
  };
  
  const deleteCliente = (id) => {
    fetch(`http://localhost:8080/api/clientes/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        // Si la eliminación es exitosa, actualizar la lista de clientes
        const updatedClientes = clientes.filter(cliente => cliente._id !== id);
        setClientes(updatedClientes);
        Swal.fire(
          '¡Eliminado!',
          'El cliente ha sido eliminado',
          'success'
        );
      } else {
        console.error('Error al eliminar el cliente:', response.statusText);
        Swal.fire(
          'Error',
          'Hubo un problema al eliminar el cliente',
          'error'
        );
      }
    })
    .catch(error => {
      console.error('Error al eliminar el cliente:', error);
      Swal.fire(
        'Error',
        'Hubo un problema al eliminar el cliente',
        'error'
      );
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center">
      <div className='bg-secondary-100 w-full rounded-lg'>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6  p-8">
          <div>
            <h1 className="text-2xl font-bold mb-4 pt-4 text-texto-100">Listado de clientes</h1>
          </div>
          <div className="flex gap-4">
            <div>
              <input
                className="w-full px-2 py-2 rounded-lg pl-4 placeholder-black text-black bg-secondary-900"
                type="search"
                placeholder="Buscar"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="">
              <Link to="/clientes/registrar-cliente">
                <button className="w-full px-4 py-2 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold">
                  Agregar
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className='p-5 overflow-x-auto rounded-lg mx-[47px]'>
          <table className="min-w-full divide-y divide-gray-500 rounded-lg">
            <thead className="bg-secondary-900 rounded-lg">
              <tr className=''>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider">
                  Teléfono
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider">
                  Correo electrónico
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider">
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${cliente.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                      disabled
                    >
                      {cliente.activo ? 'Activo' : 'Inactivo'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex">
                    <Link to={`/clientes/editar-cliente/${cliente._id}`}>
                      <FaEdit className="text-black hover:text-gray-700 transition-colors cursor-pointer" />
                    </Link>
                    <FaTrash className="text-black hover:text-red-700 transition-colors cursor-pointer ml-2" onClick={() => handleDelete(cliente._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Paginación */}
        <div className="flex justify-center my-4">
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
