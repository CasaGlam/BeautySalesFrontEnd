import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const RegistrarProveedor = () => {
  const [proveedor, setProveedor] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    direccion: "",
    descripcion: "" // Agregar campo de descripción
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProveedor({
      ...proveedor,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar que todos los campos estén llenos
    if (proveedor.nombre && proveedor.telefono && proveedor.correo && proveedor.direccion && proveedor.descripcion) {
      // Enviar solicitud POST para registrar el proveedor
      fetch('http://localhost:8080/api/proveedores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proveedor),
      })
      .then(response => {
        if (response.ok) {
          // Mostrar alerta de proveedor creado
          Swal.fire("¡Proveedor creado!", "", "success");
          // Redirigir a la página de proveedores después de 2 segundos
          setTimeout(() => {
            window.location.href = "/proveedores";
          }, 2000);
        } else {
          // Mostrar alerta de error
          Swal.fire("¡Error al crear proveedor!", "", "error");
        }
      })
      .catch(error => {
        console.error('Error al registrar proveedor:', error);
        // Mostrar alerta de error
        Swal.fire("¡Error al crear proveedor!", "", "error");
      });
    } else {
      // Mostrar alerta de campos vacíos
      Swal.fire("¡Debes llenar todos los campos!", "", "error");
    }
  };

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-10 pt-4 text-texto-100">Registrar proveedor nuevo</h1>
      <div className="flex justify-center">
        <div className="w-full md:flex flex-col md:w-[60%]">
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
              <div className="relative flex-1">
                <FaUser className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="text"
                  placeholder="Nombre"
                  name="nombre"
                  value={proveedor.nombre}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
                />
              </div>
              <div className="relative flex-1">
                <FaPhone className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="text"
                  placeholder="Teléfono"
                  name="telefono"
                  value={proveedor.telefono}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
                />
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
              <div className="relative flex-1">
                <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  name="correo"
                  value={proveedor.correo}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
                />
              </div>
              <div className="relative flex-1">
                <FaMapMarkerAlt className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="text"
                  placeholder="Dirección"
                  name="direccion"
                  value={proveedor.direccion}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
                />
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
              <div className="relative flex-1">
                <FaInfoCircle className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="text"
                  placeholder="Descripción"
                  name="descripcion"
                  value={proveedor.descripcion}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
                />
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
              <div className="flex-1">
                <button
                  type="submit"
                  className="w-full px-3 py-3 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold"
                >
                  Crear proveedor
                </button>
              </div>
              <div className="flex-1">
                <Link to="/proveedores">
                  <button className="w-full px-3 py-3 rounded-lg bg-gray-600 text-white hover:bg-opacity-[80%] transition-colors font-bold">
                    Volver
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrarProveedor;
