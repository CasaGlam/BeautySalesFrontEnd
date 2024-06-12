import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

import { MdCategory } from "react-icons/md";
import { FaInfoCircle, FaBoxes } from "react-icons/fa";

const EditarCategoria = () => {
  const [categoria, setCategoria] = useState({
    nombre: "",
    descripcion: "",
    estado: ""
  });

  const { objectId } = useParams();

  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/categorias/${objectId}`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos del usuario');
        }
        const data = await response.json();
        setCategoria(data.categoria);
      } catch (error) {
        console.error("Error fetching categoria:", error);
      }
    };

    fetchCategoria();

  }, [objectId]);

  const handleChange = (e) => {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value
    });
  };

  const handleActualizarCategoria = () => {
    // Verificar que al menos un campo tenga un valor
    if (
      Object.values(categoria).some(value => typeof value === 'string' && value.trim() === "")
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    // Realizar la solicitud PUT para actualizar la categoría
    fetch(`http://localhost:8080/api/categorias/${objectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(categoria)
    })
    .then(response => {
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Categoría actualizada!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          // Redireccionar al usuario a la ruta /categorias
          window.location.href = '/categorias';
          // Realizar otras acciones necesarias en caso de éxito
        });
      } else {
        throw new Error("Error al actualizar categoría");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar categoría',
        text: 'Hubo un problema al actualizar la categoría. Por favor, inténtalo de nuevo más tarde.',
        confirmButtonColor: '#3085d6',
      });
    });
  };

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-10 pt-4 text-texto-100">Editar categoría</h1>
      <div className="flex justify-center">
        <div className="w-full md:flex flex-col md:w-[90%]">
          <div className="w-full flex flex-col gap-6 mb-10">
            <div className="flex gap-6">
              <div className="w-full">
                <label htmlFor="nombre" className="text-texto-100 mb-2 block">Nombre de la categoría</label>
                <div className="relative w-full">
                <MdCategory  className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="text"
                  placeholder="Nombre de la categoría"
                  className="text-black w-full px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
                  name="nombre"
                  value={categoria.nombre}
                  onChange={handleChange}
                />
                </div>
              </div>
              <div className="w-full">
                <label htmlFor="estado" className="text-texto-100 mb-2 block">Estado</label>
                <select
                  name="estado"
                  value={categoria.estado}
                  onChange={handleChange}
                  className="text-black px-4 py-3 rounded-lg w-full bg-secondary-900"
                >
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="descripcion" className="text-texto-100 mb-2 block">Descripción</label>
              <div className="relative w-full">
              <FaInfoCircle className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />

              <textarea
                placeholder="Descripción"
                name="descripcion"
                value={categoria.descripcion}
                className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900 w-full"
                rows={1}
                style={{ minHeight: "50px" }}
                onChange={handleChange}
              />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center gap-12 mb-10">
            <Link to="/categorias" className="w-full md:w-[35%]">
              <button className="w-full px-3 py-3 rounded-lg bg-gray-600 text-white hover:bg-opacity-[80%] transition-colors font-bold">
                Volver
              </button>
            </Link>
            <button
              className="w-full md:w-[35%] px-3 py-3 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold"
              onClick={handleActualizarCategoria}
            >
              Actualizar categoría
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarCategoria;
