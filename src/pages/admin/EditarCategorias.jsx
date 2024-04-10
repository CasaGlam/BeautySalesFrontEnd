import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const EditarCategoria = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [categoria, setCategoria] = useState({
    _id: "",
    nombre: "",
    descripcion: "",
    estado: ""
  });
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/categorias');
        if (response.ok) {
          const data = await response.json();
          if (data && data.categorias && data.categorias.length > 0) {
            setCategorias(data.categorias);
            // Asigna la primera categoría como la categoría inicial
            setCategoriaSeleccionada(data.categorias[0]._id);
          } else {
            console.error('No se encontraron categorías en la respuesta:', data);
          }
        } else {
          console.error('Error al obtener las categorías:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    obtenerCategorias();
  }, []);

  useEffect(() => {
    const obtenerCategoriaSeleccionada = () => {
      const categoriaAEditar = categorias.find(c => c._id === categoriaSeleccionada);
      if (categoriaAEditar) {
        setCategoria({
          _id: categoriaAEditar._id,
          nombre: categoriaAEditar.nombre,
          descripcion: categoriaAEditar.descripcion,
          estado: categoriaAEditar.estado
        });
      }
    };

    obtenerCategoriaSeleccionada();
  }, [categorias, categoriaSeleccionada]);

  const handleBuscarCategoria = (e) => {
    const valorBusqueda = e.target.value;
    setBusqueda(valorBusqueda);

    // Filtrar categorías según la búsqueda
    const categoriaEncontrada = categorias.find(c =>
      c.nombre.toLowerCase().includes(valorBusqueda.toLowerCase())
    );

    // Actualizar el estado de la categoría seleccionada
    setCategoriaSeleccionada(categoriaEncontrada ? categoriaEncontrada._id : "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoria({
      ...categoria,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/categorias/${categoria._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: categoria.nombre,
          descripcion: categoria.descripcion,
          estado: categoria.estado
        })
      });
      if (response.ok) {
        Swal.fire("¡Categoría editada!", "", "success");
        setTimeout(() => {
          window.location.href = "/categorias";
        }, 2000);
      } else {
        Swal.fire("Error", "Hubo un problema al editar la categoría", "error");
      }
    } catch (error) {
      console.error('Error al editar la categoría:', error);
      Swal.fire("Error", "Hubo un problema al editar la categoría", "error");
    }
  };

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-10 pt-4">Editar categoría</h1>
      <div className="flex justify-center">
        <div className="w-full md:flex flex-col md:w-[60%]">
          <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
            <input
              type="text"
              placeholder="Buscar categoría"
              value={busqueda}
              onChange={handleBuscarCategoria}
              className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
              <div className="relative">
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
              <div className="relative">
                <select
                  name="estado"
                  value={categoria.estado}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
                >
                  <option value={true}>Activo</option>
                  <option value={false}>Inactivo</option>
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
