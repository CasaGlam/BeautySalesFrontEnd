import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBox, FaInfoCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const EditarProducto = () => {
  const [productos, setProductos] = useState([]);
  const [productoFiltrado, setProductoFiltrado] = useState({
    _id: "",
    nombre: "",
    precio: "",
    cantidad: "",
    descripcion: "",
    estado: false
  });
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/productos');
        if (response.ok) {
          const data = await response.json();
          if (data && data.productos && data.productos.length > 0) {
            setProductos(data.productos);
          } else {
            console.error('No se encontraron productos en la respuesta:', data);
          }
        } else {
          console.error('Error al obtener los productos:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    obtenerProductos();
  }, []);

  const handleBuscarProducto = (e) => {
    const valorBusqueda = e.target.value;
    setBusqueda(valorBusqueda);

    // Filtrar productos según la búsqueda
    const productoEncontrado = productos.find(p =>
      p.nombre.toLowerCase().includes(valorBusqueda.toLowerCase())
    );

    // Actualizar el estado del producto filtrado
    setProductoFiltrado(productoEncontrado ? productoEncontrado : {
      _id: "",
      nombre: "",
      precio: "",
      cantidad: "",
      descripcion: "",
      estado: false
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductoFiltrado({
      ...productoFiltrado,
      [name]: name === 'estado' ? value === 'activo' : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/productos/${productoFiltrado._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: productoFiltrado.nombre,
          precio: productoFiltrado.precio,
          cantidad: productoFiltrado.cantidad,
          descripcion: productoFiltrado.descripcion,
          estado: productoFiltrado.estado
        })
      });
      if (response.ok) {
        Swal.fire("¡Producto editado!", "", "success");
        setTimeout(() => {
          window.location.href = "/productos";
        }, 2000);
      } else {
        Swal.fire("Error", "Hubo un problema al editar el producto", "error");
      }
    } catch (error) {
      console.error('Error al editar el producto:', error);
      Swal.fire("Error", "Hubo un problema al editar el producto", "error");
    }
  };

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-10 pt-4">Editar producto</h1>
      <div className="flex justify-center">
        <div className="w-full md:flex flex-col md:w-[60%]">
          <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
            <input
              type="text"
              placeholder="Buscar producto"
              value={busqueda}
              onChange={handleBuscarProducto}
              className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
              <div className="relative">
                <FaBox className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="text"
                  placeholder="Nombre"
                  name="nombre"
                  value={productoFiltrado.nombre}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
                />
              </div>
              <div className="relative">
                <FaBox className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="text"
                  placeholder="Precio"
                  name="precio"
                  value={productoFiltrado.precio}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
                />
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
              <div className="relative">
                <FaBox className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="text"
                  placeholder="Cantidad"
                  name="cantidad"
                  value={productoFiltrado.cantidad}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
                />
              </div>
              <div className="relative">
                <FaInfoCircle className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="text"
                  placeholder="Descripción"
                  name="descripcion"
                  value={productoFiltrado.descripcion}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
                />
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
              <div className="relative">
                <select
                  name="estado"
                  value={productoFiltrado.estado ? 'activo' : 'inactivo'}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
                >
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </select>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
              <button
                type="submit"
                className="w-full md:w-[43%]  px-3 py-3 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold"
              >
                Guardar cambios
              </button>
              <Link to="/productos" className="w-full md:w-[43%]">
                <button className="w-full  px-3 py-3 rounded-lg bg-gray-600 text-white hover:bg-opacity-[80%] transition-colors font-bold">
                  Volver
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
