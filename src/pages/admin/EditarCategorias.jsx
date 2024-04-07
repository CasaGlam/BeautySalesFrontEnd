import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBox, FaInfoCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const EditarCategoria = () => {
  // Simulación de datos de la categoría a editar
  const categoriaInicial = {
    nombre: "Categoría de ejemplo",
    descripcion: "Descripción de la categoría de ejemplo"
  };

  const [categoria, setCategoria] = useState(categoriaInicial);

  useEffect(() => {
    // Simulación de carga de datos de la categoría a editar
    // Aquí puedes hacer una llamada a la API para obtener los datos reales
    // En este ejemplo, cargamos los datos de la categoría inicialmente
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoria({
      ...categoria,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de función de edición de la categoría
    // Aquí puedes enviar los datos de la categoría a la API para actualizarlos
    // En este ejemplo, mostramos una alerta de éxito y redirigimos a la página de categorías
    Swal.fire("¡Categoría editada!", "", "success");
    setTimeout(() => {
      window.location.href = "/categorias";
    }, 2000);
  };

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-10 pt-4">Editar categoría</h1>
      <div className="flex justify-center">
        <div className="w-full md:flex flex-col md:w-[60%]">
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
              <div className="relative">
                <FaBox className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
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
                <FaInfoCircle className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
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
                Guardar cambios
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

export default EditarCategoria;
