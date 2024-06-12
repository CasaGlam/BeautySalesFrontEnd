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

    // Validar que todos los campos estén llenos y que el teléfono tenga 10 dígitos
    if (!proveedor.nombre.trim()) {
      Swal.fire("¡Error!", "El campo 'Nombre' no puede estar vacío.", "error");
      return;
    }
    if (!proveedor.telefono.trim()) {
      Swal.fire("¡Error!", "El campo 'Teléfono' no puede estar vacío.", "error");
      return;
    }
    if (proveedor.telefono.length !== 10 || !/^[0-9]+$/.test(proveedor.telefono)) {
      Swal.fire("¡Error!", "El teléfono debe tener 10 dígitos numéricos.", "error");
      return;
    }
    if (!proveedor.correo.trim()) {
      Swal.fire("¡Error!", "El campo 'Correo electrónico' no puede estar vacío.", "error");
      return;
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(proveedor.correo)) {
      Swal.fire("¡Error!", "El correo electrónico no tiene un formato válido.", "error");
      return;
    }
    if (!proveedor.direccion.trim()) {
      Swal.fire("¡Error!", "El campo 'Dirección' no puede estar vacío.", "error");
      return;
    }
    if (!proveedor.descripcion.trim()) {
      Swal.fire("¡Error!", "El campo 'Descripción' no puede estar vacío.", "error");
      return;
    }

    // Verificar si el proveedor ya existe en la base de datos
    fetch("http://localhost:8080/api/proveedores")
      .then((response) => response.json())
      .then((data) => {
        // Verificar si la respuesta contiene la propiedad 'proveedores'
        if (data && data.proveedores && Array.isArray(data.proveedores)) {
          // Verificar si el nombre, correo, teléfono y dirección ya están registrados
          const proveedorExistente = data.proveedores.find(
            (p) =>
              p.nombre.toLowerCase() === proveedor.nombre.toLowerCase() ||
              p.correo.toLowerCase() === proveedor.correo.toLowerCase() ||
              p.telefono === proveedor.telefono ||
              p.direccion.toLowerCase() === proveedor.direccion.toLowerCase()
          );
          if (proveedorExistente) {
            // Mostrar una alerta si algún campo ya está registrado
            Swal.fire(
              "¡Error!",
              "El nombre, correo, teléfono o dirección ya están registrados.",
              "error"
            );
          } else {
            // Si el proveedor no existe, enviar la solicitud POST para registrar el proveedor
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
          }
        } else {
          throw new Error("La respuesta no contiene la propiedad 'proveedores'");
        }
      })
      .catch((error) => {
        console.error("Error al verificar proveedor existente:", error);
        Swal.fire(
          "¡Error!",
          "Hubo un problema al verificar si el proveedor ya está registrado. Por favor, inténtalo de nuevo más tarde.",
          "error"
        );
      });
  };

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-10 pt-4 text-black">Registrar proveedor nuevo</h1>
      <div className="flex justify-center">
      <div className="w-full md:flex flex-col md:w-[90%]">
      <form onSubmit={handleSubmit}>
          <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10 ">
          <div className="flex flex-col w-full">
          <label htmlFor="nombre" className="pb-1 text-texto-100">Nombre</label>
                <div className="relative w-full">
                  <FaUser className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                  <input
                    type="text"
                    placeholder="Nombre"
                    name="nombre"
                    value={proveedor.nombre}
                    onChange={handleChange}
                    className="text-black w-full px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="telefono" className="pb-1 text-black">Teléfono</label>
                <div className="relative w-full">
                  <FaPhone className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    name="telefono"
                    value={proveedor.telefono}
                    onChange={handleChange}
                    className="text-black w-full px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
                  />
                </div>
              </div>
              </div>
              <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10 ">
              <div className="flex flex-col w-full">
                <label htmlFor="correo" className="pb-1 text-black">Correo electrónico</label>
                <div className="relative w-full">
                  <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    name="correo"
                    value={proveedor.correo}
                    onChange={handleChange}
                    className="text-black w-full px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="direccion" className="pb-1 text-black">Dirección</label>
                <div className="relative w-full">
                  <FaMapMarkerAlt className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                  <input
                    type="text"
                    placeholder="Dirección"
                    name="direccion"
                    value={proveedor.direccion}
                    onChange={handleChange}
                    className="text-black w-full px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
                  />
                </div>
              </div>
              </div>
              <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10 ">

              <div className="flex flex-col w-full">
                <label htmlFor="descripcion" className="pb-1 text-black">Descripción</label>
                <div className="relative w-full">
                  <FaInfoCircle className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                  <textarea
                    placeholder="Descripción"
                    name="descripcion"
                    value={proveedor.descripcion}
                    onChange={handleChange}
                    className="text-black w-full px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
                    rows={1}
                    style={{ minHeight: "50px" }}
                  />
                </div>
              </div>
              </div>
            <div className="w-full flex flex-col-reverse md:flex-row justify-center gap-12 mb-10">
              <Link to="/proveedores" className="w-full md:w-[35%]">
                <button className="w-full px-3 py-3 rounded-lg bg-gray-600 text-white hover:bg-opacity-[80%] transition-colors font-bold">
                  Volver
                </button>
              </Link>
              <button
                type="submit"
                className="w-full md:w-[35%] px-3 py-3 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold"
              >
                Crear proveedor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrarProveedor;
