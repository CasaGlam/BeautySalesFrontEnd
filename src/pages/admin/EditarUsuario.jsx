import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Swal from "sweetalert2";

const EditarUsuario = () => {
  const [roles, setRoles] = useState([]);
  const [usuario, setUsuario] = useState({
    nombre: "",
    correo: "",
    rol: "",
    estado: "",
  });

  // Obtiene el objectId de los parámetros de la ruta
  const { objectId } = useParams();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/usuarios/${objectId}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }
        const data = await response.json();
        setUsuario(data.usuario);
      } catch (error) {
        console.error("Error fetching usuario:", error);
      }
    };

    fetchUsuario();

    fetch("http://localhost:8080/api/roles")
      .then((response) => response.json())
      .then((data) => {
        setRoles(data.roles);
      })
      .catch((error) => console.error("Error fetching roles:", error));
  }, [objectId]);

  const handleChange = (e) => {
    let regex;
    // Expresión regular para permitir letras, números y los caracteres específicos en el correo
    const emailRegex = /^[a-zA-ZáéíóúÁÉÍÓÚ0-9\s@._-]*$/;

    // Aplicar expresión regular específica según el nombre del campo
    switch (e.target.name) {
      case "nombre":
        regex = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]*$/; // Solo letras y espacios
        break;
      case "correo":
        regex = emailRegex; // Letras, números y algunos caracteres especiales
        break;
      default:
        regex = /^[a-zA-ZáéíóúÁÉÍÓÚ0-9\s]*$/; // Por defecto, solo letras y números
        break;
    }

    // Validar el valor del campo con la expresión regular correspondiente
    if (!regex.test(e.target.value)) {
      return;
    }

    // Actualizar el estado del usuario
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.name === "correo" ? e.target.value.toLowerCase() : e.target.value,
    });
  };

  const checkIfUserExists = async (nombre, correo) => {
    try {
      const response = await fetch("http://localhost:8080/api/usuarios");
      if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
      }
      const data = await response.json();
      const usuarioExistente = data.usuarios.find(
        (usuario) => (usuario.nombre === nombre || usuario.correo === correo) && usuario._id !== objectId
      );
      return usuarioExistente;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const handleActualizarUsuario = async () => {
    // Verificar que ningún campo esté vacío
    if (
      usuario.nombre.trim() === "" ||
      usuario.correo.trim() === "" ||
      typeof usuario.rol !== "string" || // Verificar que rol sea una cadena
      typeof usuario.estado !== "string" || // Verificar que estado sea una cadena
      usuario.estado.trim() === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    // Verificar que el correo sea un email válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(usuario.correo)) {
      Swal.fire({
        icon: "error",
        title: "Correo inválido",
        text: "Por favor, ingresa un correo electrónico válido.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    // Comprobar si el nombre o el correo ya están registrados
    const usuarioExistente = await checkIfUserExists(usuario.nombre, usuario.correo);
    if (usuarioExistente) {
      if (usuarioExistente.nombre === usuario.nombre) {
        return Swal.fire("Error!", "El nombre de usuario ya está registrado.", "error");
      }
      if (usuarioExistente.correo === usuario.correo) {
        return Swal.fire("Error!", "El correo electrónico ya está registrado.", "error");
      }
    }

    const datosActualizados = {
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
      estado: usuario.estado === "activo" ? true : false,
    };

    fetch(`http://localhost:8080/api/usuarios/${objectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosActualizados),
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "¡Usuario actualizado!",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.href = "/usuarios";
          });
        } else {
          throw new Error("Error al actualizar usuario");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error al actualizar usuario",
          text: "Hubo un problema al actualizar el usuario. Por favor, inténtalo de nuevo más tarde.",
          confirmButtonColor: "#3085d6",
        });
      });
  };

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-10 pt-4 text-texto-100">Editar usuario</h1>
      <div className="flex justify-center">
        <div className="w-full md:flex flex-col md:w-[90%]">
          <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
            <div className="flex flex-col w-full">
              <label htmlFor="nombre" className="pb-1 text-texto-100">
                Nombre de usuario
              </label>
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
            <div className="flex flex-col w-full ">
              <label htmlFor="correo" className="pb-1 text-texto-100">
                Correo electrónico
              </label>
              <div className="relative w-full">
                <MdEmail className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="text"
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
              <label htmlFor="rol" className="pb-1 text-texto-100">
                Rol
              </label>
              <div className="relative">
                <select
                  name="rol"
                  id="rol"
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 w-full md:w-full md:pl-8 md:pr-12 bg-secondary-900"
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
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="estado" className="pb-1 text-texto-100">
                Estado
              </label>
              <div className="relative">
                <select
                  name="estado"
                  id="estado"
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 w-full md:w-[100%] md:pl-8 md:pr-12 bg-secondary-900"
                  onChange={handleChange}
                >
                  <option value="">Seleccione el estado</option>
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
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
              className="w-full md:w-[35%] px-3 py-3 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold"
              onClick={handleActualizarUsuario}
            >
              Actualizar usuario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarUsuario;
