import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaProductHunt, FaCartPlus, FaDonate, FaInfoCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const RegistrarProducto = () => {
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    cantidad: "",
    descripcion: "",
    idCategoria: "" // Cambiamos el nombre del campo a idCategoria
  });

  const [categorias, setCategorias] = useState([]); // Estado para almacenar las categorías obtenidas

  useEffect(() => {
    fetch("http://localhost:8080/api/categorias")
      .then((response) => response.json())
      .then((data) => {
        setCategorias(data.categorias);
      })
      .catch((error) => console.error("Error fetching categorias:", error));
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
    // Validar que todos los campos estén llenos
    if (
      producto.nombre &&
      producto.precio &&
      producto.cantidad &&
      producto.descripcion &&
      producto.idCategoria // Aseguramos que haya una categoría seleccionada
    ) {
      try {
        const response = await fetch("http://localhost:8080/api/productos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(producto),
        });

        if (response.ok) {
          // Mostrar alerta de producto creado
          Swal.fire("¡Producto creado!", "", "success");
          // Redirigir a la página de productos después de 2 segundos
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
    } else {
      // Mostrar alerta de campos vacíos
      Swal.fire("¡Debes llenar todos los campos y seleccionar una categoría!", "", "error");
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
                  name="idCategoria" // Cambiamos el name del campo a idCategoria
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
              
              <div className="w-full">
                <label htmlFor="cantidad" className="block text-black font-bold mb-1">Cantidad</label>
                <div className="relative w-full">
                  <FaCartPlus className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                  <input
                    type="text"
                    placeholder="Cantidad"
                    name="cantidad"
                    value={producto.cantidad}
                    onChange={handleChange}
                    className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900 w-full"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="precio" className="block text-black font-bold mb-1">Precio</label>
                <div className="relative">
                  <FaDonate  className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
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
