import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

// Icons
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const RegistrarUsuario = () => {
  const [roles, setRoles] = useState([]);
  const [usuario, setUsuario] = useState({
    nombre: "",
    correo: "",
    password: "",
    confirmPassword: "", // Nuevo campo para confirmar contraseña
    rol: "",
  });

  useEffect(() => {
    fetch("https://beautysalesbackend.onrender.com/api/roles")
      .then((response) => response.json())
      .then((data) => {
        setRoles(data.roles);
      })
      .catch((error) => console.error("Error fetching roles:", error));
  }, []);

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar que ningún campo esté vacío
    if (
      !usuario.nombre ||
      !usuario.correo ||
      !usuario.password ||
      !usuario.confirmPassword ||
      !usuario.rol
    ) {
      return Swal.fire(
        "Advertencia!",
        "Por favor completa todos los campos.",
        "warning"
      );
    }
    // Validar que las contraseñas coincidan
    if (usuario.password !== usuario.confirmPassword) {
      return Swal.fire("Error!", "Las contraseñas no coinciden.", "error");
    }

    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas crear este usuario?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, crear usuario",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("https://beautysalesbackend.onrender.com/api/usuarios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuario),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al crear el usuario");
            }
            return response.json();
          })
          .then((data) => {
            Swal.fire(
              "Éxito!",
              "El usuario se ha creado exitosamente.",
              "success"
            ).then(() => {
              // Redirige a la ruta '/usuarios'
              window.location.href = "/usuarios";
            });
          })
          .catch((error) => {
            Swal.fire(
              "Error!",
              error.message || "Hubo un error al crear el usuario.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-10 pt-4 text-texto-100">Registrar usuario nuevo</h1>
      <div className="flex justify-center">
        <div className="w-full md:flex flex-col md:w-[90%]">
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10 ">
              <div className="flex flex-col w-full">
              <label htmlFor="nombre" className="pb-1 text-texto-100">Nombre de usuario</label>
              <div className="relative w-full">
                <FaUser className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="text"
                  placeholder="Nombre de usuario"
                  className="text-black w-full px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
                  name="nombre"
                  id="nombre"
                  value={usuario.nombre}
                  onChange={handleChange}
                />
              </div>
              </div>
              <div className="flex flex-col w-full">
              <label htmlFor="correo" className="pb-1 text-texto-100">Correo electrónico</label>
              <div className="relative">
                <MdEmail className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="text-black w-full px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
                  name="correo"
                  id="correo"
                  value={usuario.correo}
                  onChange={handleChange}
                />
              </div>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
            <div className="flex flex-col w-full">
              <label htmlFor="password" className="pb-1 text-texto-100">Contraseña</label>
              <div className="relative">
                <FaLock className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="text-black w-full px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
                  name="password"
                  id="password"
                  value={usuario.password}
                  onChange={handleChange}
                />
              </div>
              </div>
              <div className="flex flex-col w-full">
              <label htmlFor="confirmPassword" className="pb-1 text-texto-100">Confirmar contraseña</label>
              <div className="relative">
                <FaLock className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="password"
                  placeholder="Confirmar contraseña"
                  className="text-black w-full px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={usuario.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
            <div className="flex flex-col md:w-[47%]">
              <label htmlFor="rol" className="pb-1 text-texto-100">Rol</label>
              <div className="relative">
                <select
                  name="rol"
                  className="text-black w-full px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
                  value={usuario.rol}
                  id="rol"
                  onChange={handleChange}
                >
                  <option value="">Seleccione un rol</option>
                  {roles.map((rol) => (
                    <option key={rol._id} value={rol.rol}>
                      {rol.rol}
                    </option>
                  ))}
                </select>
              </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-12 mb-10">
              
              <Link to="/usuarios" className="w-full md:w-[35%]">
                <button className="w-full px-3 py-3 rounded-lg bg-gray-600 text-white hover:bg-opacity-[80%] transition-colors font-bold">
                  Volver
                </button>
              </Link>
              <button
                type="submit"
                className="w-full md:w-[35%] px-3 py-3 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold"
              >
                Crear usuario
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrarUsuario;
