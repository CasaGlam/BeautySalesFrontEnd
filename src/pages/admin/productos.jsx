import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Productos = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch('http://localhost:8080/api/productos')
      .then(response => response.json())
      .then(data => {
        if (data && data.productos && Array.isArray(data.productos)) {
          setProductos(data.productos);
        } else {
          console.error('Datos de productos no encontrados en la respuesta:', data);
        }
      })
      .catch(error => console.error('Error fetching productos:', error));

    fetch('http://localhost:8080/api/categorias')
      .then(response => response.json())
      .then(data => {
        if (data && data.categorias && Array.isArray(data.categorias)) {
          setCategorias(data.categorias);
        } else {
          console.error('Datos de categorías no encontrados en la respuesta:', data);
        }
      })
      .catch(error => console.error('Error fetching categorías:', error));
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    if (/^[A-Za-z\s]+$/.test(value) || value === '') {
      setSearchTerm(value);
      setCurrentPage(1);
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
    // Consultar la API de compras para verificar si el producto está relacionado con alguna compra
    fetch(`http://localhost:8080/api/compras/producto/${id}`)
      .then(response => {
        if (response.ok) {
          // Si la consulta es exitosa, verificar si hay alguna compra relacionada con el producto
          return response.json();
        }
        throw new Error('Error al consultar las compras relacionadas con el producto');
      })
      .then(data => {
        // Si hay compras relacionadas, mostrar una alerta y evitar la eliminación
        if (data && data.comprasRelacionadas && data.comprasRelacionadas.length > 0) {
          Swal.fire({
            icon: 'error',
            title: 'Producto relacionado con una compra',
            text: 'Este producto no se puede eliminar porque está relacionado con una compra.'
          });
        } else {
          // Si no hay compras relacionadas, consultar la API de ventas
          checkVentas(id);
        }
      })
      .catch(error => {
        console.error('Error al verificar las compras relacionadas con el producto:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: ' No se puede eliminar el producto porque hay compras relacionadas con el producto.'
        });
      });
  };
  
  const checkVentas = (id) => {
    // Consultar la API de ventas para verificar si el producto está relacionado con alguna venta
    fetch(`http://localhost:8080/api/ventas/producto/${id}`)
      .then(response => {
        if (response.ok) {
          // Si la consulta es exitosa, verificar si hay alguna venta relacionada con el producto
          return response.json();
        }
        throw new Error('Error al consultar las ventas relacionadas con el producto');
      })
      .then(data => {
        // Si hay ventas relacionadas, mostrar una alerta y evitar la eliminación
        if (data && data.ventasRelacionadas && data.ventasRelacionadas.length > 0) {
          Swal.fire({
            icon: 'error',
            title: 'Producto relacionado con una venta',
            text: 'Este producto no se puede eliminar porque está relacionado con una venta.'
          });
        } else {
          // Si no hay ventas relacionadas, confirmar la eliminación del producto
          confirmDelete(id);
        }
      })
      .catch(error => {
        console.error('Error al verificar las ventas relacionadas con el producto:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se puede eliminar el producto porque hay ventas relacionadas con el producto.'
        });
      });
  };
  
  const confirmDelete = (id) => {
    // Mostrar la confirmación de eliminación solo si no hay compras o ventas relacionadas con el producto
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
        // Si se confirma la eliminación, realizar la solicitud de eliminación del producto
        deleteProducto(id);
      }
    });
  };
  
  const deleteProducto = (id) => {
    fetch(`http://localhost:8080/api/productos/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        // Si la eliminación es exitosa, actualizar la lista de productos
        const updatedProductos = productos.filter(producto => producto._id !== id);
        setProductos(updatedProductos);
        Swal.fire(
          '¡Eliminado!',
          'El producto ha sido eliminado',
          'success'
        );
      } else {
        console.error('Error al eliminar el producto:', response.statusText);
        Swal.fire(
          'Error',
          'Hubo un problema al eliminar el producto',
          'error'
        );
      }
    })
    .catch(error => {
      console.error('Error al eliminar el producto:', error);
      Swal.fire(
        'Error',
        'Hubo un problema al eliminar el producto',
        'error'
      );
    });
  };
  
  return (
    <div className="flex justify-center">
      <div className='bg-secondary-100 w-full rounded-lg'>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6  p-8">
          <div>
            <h1 className="text-2xl font-bold mb-4 pt-4">Listado de productos</h1>
          </div>
          <div className="flex gap-4">
            <div>
              <input
                className="w-full px-2 py-2 rounded-lg pl-4 placeholder-black text-black"
                type="search"
                placeholder="Buscar "
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
        <div className='p-5 overflow-x-auto rounded-lg mx-[50px]'>
          <table className="min-w-full divide-y divide-gray-500 rounded-lg">
            <thead className="bg-secondary-900 rounded-lg">
              <tr className=''>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Precio
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Cantidad
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Descripción
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Categoría
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
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
               {/* Buscar la categoría por su ID */}
               <td className="px-6 py-4 whitespace-nowrap text-black">{categorias.find(categoria => categoria._id === producto.categoria)?.nombre}</td>
             <td className="px-6 py-4 whitespace-nowrap">
               <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${producto.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
               {producto.estado ? 'Activo' : 'Inactivo'}
            </span>
          </td>
           <td className="px-6 py-4 whitespace-nowrap flex">
           <FaTrash className="text-black hover:text-red-700 transition-colors cursor-pointer" onClick={() => handleDelete(producto._id)} />
           <Link to={`/productos/editar-producto/${producto._id}`}>
             <FaEdit className="text-black hover:text-primary-700 transition-colors cursor-pointer ml-2" />
           </Link>
           </td>
          </tr>
          ))}
            </tbody>
          </table>
        </div>
        
          <div className="flex justify-center my-4 ">
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
  );
};

export default Productos;