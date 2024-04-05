import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaDollarSign, FaBoxes } from "react-icons/fa";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar que todos los campos estén llenos
    if (
      categoria.nombre &&
      categoria.descripcion
    ) {
      // Mostrar alerta de categoría creada
      Swal.fire("¡Categoría creada!", "", "success");
      // Redirigir a la página de categorías después de 2 segundos
      setTimeout(() => {
        window.location.href = "/categorias";
      }, 2000);
    } else {
      // Mostrar alerta de campos vacíos
      Swal.fire("¡Debes llenar todos los campos!", "", "error");
    }
  };

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-10 pt-4">Registrar nueva categoría</h1>
      <div className="flex justify-center">
        <div className="w-full md:flex flex-col md:w-[60%]">
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
              <div className="relative">
                <FaDollarSign className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="text"
                  placeholder="Nombre"
                  name="nombre"
                  value={categoria.nombre}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
                />
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
              <div className="relative">
                <FaBoxes className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="text"
                  placeholder="Descripción"
                  name="descripcion"
                  value={categoria.descripcion}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
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
