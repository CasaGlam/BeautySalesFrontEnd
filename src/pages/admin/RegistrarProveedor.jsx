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
    descripcion: ""
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
    if (
      proveedor.nombre &&
      proveedor.telefono &&
      proveedor.correo &&
      proveedor.direccion &&
      proveedor.descripcion
    ) {
      // Verificar si el nombre ya está en uso
      fetch(`http://localhost:8080/api/proveedores?nombre=${proveedor.nombre}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al verificar el nombre del proveedor");
        })
        .then((data) => {
          if (data.length > 0) {
            // Si el nombre ya está en uso, mostrar alerta y salir de la función
            Swal.fire(
              "¡Error!",
              "El nombre de proveedor ya está en uso",
              "error"
            );
            return;
          }
          // Si el nombre no está en uso, enviar solicitud POST para registrar el proveedor
          fetch("http://localhost:8080/api/proveedores", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(proveedor),
          })
            .then((response) => {
              if (response.ok) {
                Swal.fire("¡Proveedor creado!", "", "success");
                setTimeout(() => {
                  window.location.href = "/proveedores";
                }, 2000);
              } else {
                throw new Error("Error al crear proveedor");
              }
            })
            .catch((error) => {
              console.error("Error al registrar proveedor:", error);
              Swal.fire(
                "¡Error al crear proveedor!",
                "",
                "error"
              );
            });
        })
        .catch((error) => {
          console.error("Error al verificar nombre de proveedor:", error);
          Swal.fire(
            "¡Error al verificar nombre de proveedor!",
            "",
            "error"
          );
        });
    } else {
      Swal.fire("¡Debes llenar todos los campos!", "", "error");
    }
  };
  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-10 pt-4">Registrar proveedor nuevo</h1>
      <div className="flex justify-center">
        <div className="w-full md:flex flex-col md:w-[60%]">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex flex-col">
                <label htmlFor="nombre" className="pb-1 text-white">Nombre</label>
                <div className="relative">
                  <FaUser className="absolute top-1/2 transform -translate-y-1/2 left-2 text-black" />
                  <input
                    type="text"
                    placeholder="Nombre"
                    name="nombre"
                    value={proveedor.nombre}
                    onChange={handleChange}
                    className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="telefono" className="pb-1 text-white">Teléfono</label>
                <div className="relative">
                  <FaPhone className="absolute top-1/2 transform -translate-y-1/2 left-2 text-black" />
                  <input
                    type="text"
                    placeholder="Teléfono"
                    name="telefono"
                    value={proveedor.telefono}
                    onChange={handleChange}
                    className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="correo" className="pb-1 text-white">Correo electrónico</label>
                <div className="relative">
                  <FaEnvelope className="absolute top-1/2 transform -translate-y-1/2 left-2 text-black" />
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    name="correo"
                    value={proveedor.correo}
                    onChange={handleChange}
                    className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="direccion" className="pb-1 text-white">Dirección</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute top-1/2 transform -translate-y-1/2 left-2 text-black" />
                  <input
                    type="text"
                    placeholder="Dirección"
                    name="direccion"
                    value={proveedor.direccion}
                    onChange={handleChange}
                    className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
                  />
                </div>
              </div>
              <div className="flex flex-col col-span-2">
                <label htmlFor="descripcion" className="pb-1 text-white">Descripción</label>
                <div className="relative">
                  <FaInfoCircle className="absolute top-1/2 transform -translate-y-1/2 left-2 text-black" />
                  <textarea
                    placeholder="Descripción"
                    name="descripcion"
                    value={proveedor.descripcion}
                    onChange={handleChange}
                    className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 w-full"
                    style={{ minHeight: "50px" }}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
              <button
                type="submit"
                className="w-full md:w-[43%] px-3 py-3 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold"
              >
                Crear proveedor
              </button>
              <Link to="/proveedores" className="w-full md:w-[43%]">
                <button className="w-full px-3 py-3 rounded-lg bg-gray-600 text-white hover:bg-opacity-[80%] transition-colors font-bold">
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

export default RegistrarProveedor;
