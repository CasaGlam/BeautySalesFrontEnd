import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaUser } from "react-icons/fa";

const RegistrarRol = () => {
  const [rol, setRol] = useState("");
  const [permisos, setPermisos] = useState([]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setPermisos([...permisos, name]);
    } else {
      setPermisos(permisos.filter((permiso) => permiso !== name));
    }
  };

  const handleRoleNameChange = (e) => {
    const { value } = e.target;
    // Validación del nombre de rol
    if (/^[a-zA-Z0-9áéíóúÁÉÍÓÚ ]*$/.test(value) || value === "") {
      setRol(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos en blanco
    if (!rol.trim() || permisos.length === 0) {
      Swal.fire({
        title: "Error",
        text: "Debes completar todos los campos y seleccionar al menos un permiso.",
        icon: "error",
      });
      return;
    }

    // Realizar la solicitud GET para obtener todos los roles
    fetch("https://beautysalesbackend.onrender.com/api/roles")
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de roles.");
        }
        return response.json();
      })
      .then((data) => {
        // Verificar si el nombre de rol ya existe en la lista de roles
        const existingRole = data.roles.find((existingRole) => existingRole.rol === rol);
        if (existingRole) {
          Swal.fire({
            title: "Error",
            text: "El nombre de rol ya existe. Por favor, elige otro nombre.",
            icon: "error",
          });
        } else {
          // El nombre de rol no existe, enviar el formulario
          Swal.fire({
            title: "¿Estás seguro?",
            text: "¿Quieres crear este rol?",
            icon: "question",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Sí",
          }).then((result) => {
            if (result.isConfirmed) {
              fetch("https://beautysalesbackend.onrender.com/api/roles", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ rol, permisos }),
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("No se pudo crear el rol.");
                  }
                  return response.json();
                })
                .then((data) => {
                  console.log("Response:", data);
                  Swal.fire({
                    title: "Éxito",
                    text: "El rol se ha creado correctamente.",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                  }).then(() => {
                    window.location.href = "/roles";
                  });
                })
                .catch((error) => {
                  console.error("Error:", error);
                  Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error",
                  });
                });
            }
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      });
  };

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-10 pt-4 text-texto-100">Registrar rol nuevo</h1>
      <div className="flex justify-center">
        <div className="w-full md:flex flex-col md:w-[60%]">
          <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
            <div className="flex flex-col w-full">
              <label htmlFor="rol" className="pb-1 text-texto-100">Nombre de rol</label>
              <div className="relative w-ful">
                <FaUser className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="text"
                  placeholder="Nombre de rol"
                  className="w-full text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
                  value={rol}
                  onChange={handleRoleNameChange}
                  id="rol"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <h2 className="text-3xl font-bold text-texto-100">Permisos</h2>
          </div>
          <div className="w-full flex flex-wrap justify-center gap-4 mb-10 mt-10 border py-4 border-texto-100 rounded-lg">
            {[
              "dashboard",
              "productos",
              "categorias",
              "compras",
              "ventas",
              "proveedores",
              "clientes",
              "usuarios",
              "roles",
            ].map((permiso) => (
              <div
                key={permiso}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex items-center p-4 gap-4"
              >
                <input
                  type="checkbox"
                  name={permiso}
                  id={permiso}
                  onChange={handleCheckboxChange}
                  className="form-checkbox text-primary border-primary"
                />
                <label htmlFor={permiso} className="text-primary font-bold">
                  {permiso.charAt(0).toUpperCase() + permiso.slice(1)}
                </label>
              </div>
            ))}
          </div>

          <div className="w-full flex flex-col-reverse md:flex-row justify-center gap-12 mb-10">
            <Link to="/roles" className="w-full md:w-[43%]">
              <button className="w-full  px-3 py-3 rounded-lg bg-gray-600 text-white hover:bg-opacity-[80%] transition-colors font-bold">
                Volver
              </button>
            </Link>
            <button
              className="w-full md:w-[43%]  px-3 py-3 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold"
              onClick={handleSubmit} 
            >
              Crear rol
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrarRol;
