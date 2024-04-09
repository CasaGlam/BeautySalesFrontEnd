import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Swal from 'sweetalert2';

const EditarUsuario = () => {
  const [roles, setRoles] = useState([]);
  const [usuario, setUsuario] = useState({
    nombre: "",
    correo: "",
    password: "",
    confirmPassword: "",
    rol: "",
    estado: ""
  });

  // Obtiene el objectId de los parámetros de la ruta
  const { objectId } = useParams();

  useEffect(() => {
    fetch("http://localhost:8080/api/roles")
      .then((response) => response.json())
      .then((data) => {
        setRoles(data.roles);
      })
      .catch((error) => console.error("Error fetching roles:", error));
  }, []);

  useEffect(() => {
    // Aquí puedes cargar los datos del usuario a editar utilizando el objectId
    // Esto se puede hacer mediante otra solicitud al servidor con el objectId
  }, [objectId]);

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  const handleActualizarUsuario = () => {
    // Verificar que ningún campo esté vacío
    if (
      usuario.nombre.trim() === "" ||
      usuario.correo.trim() === "" ||
      usuario.password.trim() === "" ||
      usuario.confirmPassword.trim() === "" ||
      usuario.rol.trim() === "" ||
      usuario.estado.trim() === ""
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    // Verificar que el correo sea un email válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(usuario.correo)) {
      Swal.fire({
        icon: 'error',
        title: 'Correo inválido',
        text: 'Por favor, ingresa un correo electrónico válido.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    // Verificar que la contraseña tenga al menos 6 caracteres
    if (usuario.password.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseña demasiado corta',
        text: 'La contraseña debe tener al menos 6 caracteres.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    // Verificar que las contraseñas coincidan
    if (usuario.password !== usuario.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseñas no coinciden',
        text: 'La contraseña y la confirmación de contraseña deben coincidir.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    const datosActualizados = {
      nombre: usuario.nombre,
      correo: usuario.correo,
      password: usuario.password,
      rol: usuario.rol,
      estado: usuario.estado === "activo" ? true : false
    };

    fetch(`http://localhost:8080/api/usuarios/${objectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datosActualizados)
    })
    .then(response => {
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Usuario actualizado!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          // Redireccionar al usuario a la ruta /usuarios
          window.location.href = '/usuarios';
          // Realizar otras acciones necesarias en caso de éxito
        });
      } else {
        throw new Error("Error al actualizar usuario");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar usuario',
        text: 'Hubo un problema al actualizar el usuario. Por favor, inténtalo de nuevo más tarde.',
        confirmButtonColor: '#3085d6',
      });
    });
  };

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-10 pt-4">Editar usuario</h1>
      <div className="flex justify-center">
        <div className="w-full md:flex flex-col md:w-[60%]">
          <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
            <div className="relative">
              <FaUser className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
              <input
                type="text"
                placeholder="Nombre de usuario"
                className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
                name="nombre"
                value={usuario.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <MdEmail className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
              <input
                type="email"
                placeholder="Correo electrónico"
                className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
                name="correo"
                value={usuario.correo}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
            <div className="relative">
              <FaLock className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
              <input
                type="password"
                placeholder="Contraseña"
                className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
                name="password"
                value={usuario.password}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <FaLock className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
              <input
                type="password"
                placeholder="Confirmar contraseña"
                className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
                name="confirmPassword"
                value={usuario.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
            <select
              name="rol"
              className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
              value={usuario.rol}
              onChange={handleChange}
            >
              <option value="">Seleccione un rol</option>
              {roles.map((rol) => (
                <option key={rol._id} value={rol.rol}>
                  {rol.rol}
                </option>
              ))}
            </select>
            <select
              name="estado"
              className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
              value={usuario.estado}
              onChange={handleChange}
            >
              <option value="">Seleccione el estado</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
            <button
              className="w-full md:w-[43%] px-3 py-3 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold"
              onClick={handleActualizarUsuario}
            >
              Actualizar usuario
            </button>
            <Link to="/usuarios" className="w-full md:w-[43%]">
              <button className="w-full px-3 py-3 rounded-lg bg-gray-600 text-white hover:bg-opacity-[80%] transition-colors font-bold">
                Volver
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarUsuario;
