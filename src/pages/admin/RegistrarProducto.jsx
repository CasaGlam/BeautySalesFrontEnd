import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaProductHunt, FaDonate, FaInfoCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const RegistrarProducto = () => {
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    idCategoria: "",
    canvendida: 0, // Inicializamos canvendida en 0
    cantidad: 0 // Inicializamos cantidad en 0
  });

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/categorias");
        const data = await response.json();
        const categoriasFiltradas = data.categorias.filter(categoria => categoria.estado);
        setCategorias(categoriasFiltradas);
      } catch (error) {
        console.error("Error fetching categorias:", error);
      }
    };

    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar que el nombre solo contenga letras y no esté vacío
    const nombreValido = /^[A-Za-z\s]+$/.test(producto.nombre.trim());
    if (!nombreValido) {
      Swal.fire("¡Error!", "El nombre solo puede contener letras y espacios.", "error");
      return;
    }
    
    // Validar que el precio sea un número y no esté vacío
    const precioValido = /^\d+(\.\d+)?$/.test(producto.precio.trim());
    if (!precioValido) {
      Swal.fire("¡Error!", "El precio solo puede contener números.", "error");
      return;
    }

    // Validar que la descripción no esté vacía
    if (!producto.descripcion.trim()) {
      Swal.fire("¡Error!", "La descripción no puede estar vacía.", "error");
      return;
    }
    
    // Validar que se haya seleccionado una categoría
    if (!producto.idCategoria) {
      Swal.fire("¡Error!", "Debes seleccionar una categoría.", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(producto)
      });

      if (response.ok) {
        Swal.fire("¡Producto creado!", "", "success");
        setTimeout(() => {
          window.location.href = "/productos";
        }, 2000);
      } else {
        const errorMessage = await response.text();
        throw new Error(`Error al crear el producto: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error al enviar los datos del producto:", error);
      Swal.fire("¡Error!", error.message, "error");
    }
  };

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-10 pt-4 text-black">
        Registrar producto nuevo
      </h1>
      <div className="flex justify-center">
        <div className="w-full md:flex flex-col md:w-[90%]">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
              <div className="w-full">
                <label htmlFor="nombre" className="block text-black font-bold mb-1">Nombre</label>
                <div className="relative w-full">
                  <FaProductHunt className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                  <input
                    type="text"
                    placeholder="Nombre"
                    name="nombre"
                    value={producto.nombre}
                    onChange={handleChange}
                    className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900 w-full"
                  />
                </div>
              </div>
              <div className="w-full">
                <label htmlFor="idCategoria" className="block text-black font-bold mb-1">Categoría</label>
                <select
                  name="idCategoria"
                  value={producto.idCategoria}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900 md:w-full"
                >
                  <option value="">Selecciona una categoría</option>
                  {categorias.map((categoria) => (
                    <option key={categoria._id} value={categoria._id}>
                      {categoria.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="precio" className="block text-black font-bold mb-1">Precio</label>
                <div className="relative">
                  <FaDonate className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                  <input
                    type="text"
                    placeholder="Precio"
                    name="precio"
                    value={producto.precio}
                    onChange={handleChange}
                    className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900 w-full"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="descripcion" className="block text-black font-bold mb-1">Descripción</label>
                <div className="relative">
                  <FaInfoCircle className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                  <textarea
                    placeholder="Descripción"
                    name="descripcion"
                    value={producto.descripcion}
                    onChange={handleChange}
                    className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 md:w-[211%] resize-none bg-secondary-900 w-full"
                    rows={1}
                    style={{ minHeight: "50px" }}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10 my-4">
              <Link to="/productos" className="w-full md:w-[35%]">
                <button className="w-full px-3 py-3 rounded-lg bg-gray-600 text-white hover:bg-opacity-[80%] transition-colors font-bold">
                  Volver
                </button>
              </Link>
              <button
                type="submit"
                className="w-full md:w-[35%] px-3 py-3 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold"
              >
                Crear producto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrarProducto;