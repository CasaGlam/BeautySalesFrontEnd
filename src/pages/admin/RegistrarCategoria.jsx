import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaDollarSign, FaBoxes } from "react-icons/fa";
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
        Swal.fire("¡Ocurrió un error al crear la categoría!", "", "error");
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
        <div className="w-full md:flex flex-col md:w-[60%]">
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
              <div className="relative">
                <label htmlFor="nombre" className="text-black mb-2 block">Nombre</label>
                <input
                  type="text"
                  placeholder="Nombre"
                  name="nombre"
                  value={categoria.nombre}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
                />
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
              <div className="relative">
                <label htmlFor="descripcion" className="text-black mb-2 block">Descripción</label>

                <input
                  type="text"
                  placeholder="Descripción"
                  name="descripcion"
                  value={categoria.descripcion}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
                />
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
              <button
                type="submit"
                className="w-full md:w-[43%]  px-3 py-3 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold"
              >
                Crear categoría
              </button>
              <Link to="/categorias" className="w-full md:w-[43%]">
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

export default RegistrarCategoria;
