import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaInfoCircle, FaBoxes } from "react-icons/fa";
import Swal from "sweetalert2";

const RegistrarCategoria = () => {
  const [categoria, setCategoria] = useState({
    nombre: "",
    descripcion: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoria({
      ...categoria,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:8080/api/categorias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(categoria)
      });
      if (response.ok) {
        Swal.fire("¡Categoría creada!", "", "success");
        // Redirigir a la página de categorías después de 2 segundos
        setTimeout(() => {
          window.location.href = "/categorias";
        }, 2000);
      } else {
        const responseData = await response.json();
        if (responseData && responseData.message) {
          Swal.fire("Error al crear la categoría", responseData.message, "error");
        } else {
          Swal.fire("¡Ocurrió un error al crear la categoría!", "", "error");
        }
      }
    } catch (error) {
      console.error("Error al crear la categoría:", error);
      Swal.fire("¡Ocurrió un error al crear la categoría!", "", "error");
    }
  };

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-10 pt-4 text-black">Registrar nueva categoría</h1>
      <div className="flex justify-center">
        <div className="w-full md:flex flex-col md:w-[90%]">
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10 ">
              <div className="flex flex-col w-full">
              <label htmlFor="nombre" className="pb-1 text-texto-100">Nombre de Categoria</label>
              <div className="relative w-full">
                 <FaBoxes className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="text"
                  placeholder="Nombre"
                  name="nombre"
                  value={categoria.nombre}
                  onChange={handleChange}
                  className="text-black w-full px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
                />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10 ">
            <div className="flex flex-col w-full">
                <label htmlFor="descripcion" className="pb-1 text-texto-100">Descripción</label>
                <div className="relative w-full">
                <FaInfoCircle className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="text"
                  placeholder="Descripción"
                  name="descripcion"
                  value={categoria.descripcion}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900 w-full"
                  rows={4}
                  style={{ minHeight: "50px" }}
                />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
            <Link to="/categorias" className="w-full md:w-[35%]">
                <button className="w-full px-3 py-3 rounded-lg bg-gray-600 text-white hover:bg-opacity-[80%] transition-colors font-bold">
                  Volver
                </button>
              </Link>
              <button
                type="submit"
                className="w-full md:w-[35%] px-3 py-3 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold"
              >
                Crear categoría
              </button>
            
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrarCategoria;
