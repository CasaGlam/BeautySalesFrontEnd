import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdEdit } from "react-icons/md";

const Productos = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState({});
  const itemsPerPage = 5;

  useEffect(() => {
    // Obtener productos
    fetch('http://localhost:8080/api/productos')
      .then(response => response.json())
      .then(data => {
        if (data && data.productos && Array.isArray(data.productos)) {
          setProductos(data.productos);
          // Obtener categorías
          fetch('http://localhost:8080/api/categorias')
            .then(response => response.json())
            .then(data => {
              if (data && data.categorias && Array.isArray(data.categorias)) {
                const categoriasMap = {};
                data.categorias.forEach(categoria => {
                  categoriasMap[categoria._id] = categoria.nombre;
                });
                setCategorias(categoriasMap);
              } else {
                console.error('Datos de categorías no encontrados en la respuesta:', data);
              }
            })
            .catch(error => console.error('Error fetching categorías:', error));
        } else {
          console.error('Datos de productos no encontrados en la respuesta:', data);
        }
      })
      .catch(error => console.error('Error fetching productos:', error));
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    // Validar que el valor ingresado contenga solo letras
    if (/^[A-Za-z\s]+$/.test(value) || value === '') {
      setSearchTerm(value);
      setCurrentPage(1); // Resetear a la primera página al buscar
    }
  };

  const filteredProductos = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProductos.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    // Tu lógica de eliminación aquí
    console.log("Eliminar producto con ID:", id);
  };

  return (
    <div className="flex justify-center">
      <div className='bg-secondary-100 w-full rounded-lg'>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6  p-8">
          <div>
            <h1 className="text-2xl font-bold mb-4 pt-4 text-texto-100"> Listado de productos</h1>
          </div>
          <div className="flex gap-4 justify-end w-[60%]">
            <div className="w-[50%]">
              <input
                className="w-full px-2 py-2 rounded-lg pl-4 placeholder-black text-black bg-secondary-900"
                type="search"
                placeholder="Buscar"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="">
              <Link to="/productos/registrar-producto">
                <button className="w-full px-4 py-2 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold">
                  Agregar 
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className='p-5 overflow-x-auto rounded-lg mx-[47px]'>
          <table className="min-w-full divide-y divide-gray-500 rounded-lg ">
            <thead className="bg-secondary-900 rounded-lg">
              <tr className=''>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider">
                  Precio
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider">
                  Cantidad
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider">
                  Descripción
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider">
                  Categoría
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-texto-100 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-300 divide-y divide-black rounded-lg">
            {currentItems.map((producto) => (
               <tr key={producto._id}>
               <td className="px-6 py-4 whitespace-nowrap text-black">{producto.nombre}</td>
               <td className="px-6 py-4 whitespace-nowrap text-black">{producto.precio}</td>
               <td className="px-6 py-4 whitespace-nowrap text-black">{producto.cantidad}</td>
               <td className="px-6 py-4 whitespace-nowrap text-black">{producto.descripcion}</td>
               <td className="px-6 py-4 whitespace-nowrap">
                 <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${producto.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                   {producto.estado ? 'Activo' : 'Inactivo'}
                 </span>
               </td>
               <td className="px-6 py-4 whitespace-nowrap text-black">{categorias[producto.idCategoria] || 'Categoría no encontrada'}</td>
               <td className="px-6 py-4 whitespace-nowrap flex">
               <Link to={`/productos/editar-producto/${producto._id}`}>
                   <MdEdit className="text-black hover:text-primary-700 transition-colors cursor-pointer ml-2" />
                 </Link>
                 <FaTrash className="text-black hover:text-red-700 transition-colors cursor-pointer" onClick={() => handleDelete(producto._id)} />
               </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center my-4">
          <div className="flex justify-center mt-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-primary hover:text-white transition-colors"
            >
              <IoIosArrowBack/>
            </button>
            {Array.from(
              { length: Math.ceil(filteredProductos.length / itemsPerPage) },
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
              disabled={currentPage === Math.ceil(filteredProductos.length / itemsPerPage)}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-primary hover:text-white transition-colors"
            >
              <IoIosArrowForward/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productos;
