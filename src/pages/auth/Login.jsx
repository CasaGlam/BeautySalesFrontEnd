import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useWindowSize } from "react-use";
import Swal from 'sweetalert2';

// Icons
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const { width } = useWindowSize();

  useEffect(() => {
    const pruebaDiv = document.getElementById("Prueba");
    if (width < 1300 && pruebaDiv) {
      pruebaDiv.style.display = "none";
    } else if (pruebaDiv) {
      pruebaDiv.style.display = "block";
    }
  }, [width]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    if (!correo || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos vacíos',
        text: 'Por favor, complete ambos campos para iniciar sesión.',
      });
      return; // Salir de la función si los campos están vacíos
    }

    try {
      const response = await fetch("https://beautysalesbackend.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciales inválidas");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      window.location.href = "/"; // Redireccionar al usuario
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: 'Credenciales inválidas. Por favor, intenta nuevamente.',
      });
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-gray-400">
      <div
        className="w-[90vw] h-[90vh] rounded-lg flex justify-center"
        style={{ backgroundImage: "url('./src/assets/img/bg-login.jpg')" }}
      >
        <div
          className="w-[40%] h-[100%] border-r border-black"
          id="Prueba"
        >
          <img src="./src/assets/img/BeautySales.png" alt="" className="w-full h-full" />
        </div>
        <div className="text-black w-[60%] flex flex-col justify-center items-center backdrop-blur-sm rounded-lg">
          <div className="flex justify-center items-center">
            <h2 className="text-4xl font-bold mb-10 mt-10 pl-12 md:pl-0">Iniciar sesión</h2>
          </div>
          <form className="w-[80%]" onSubmit={handleSubmit}>
            <div className="relative mb-8">
              <FaUser className="absolute top-1/2 -translate-y-1/2 left-2" />
              <input
                type="text"
                className="py-3 pl-8 pr-12 w-full outline-none border-b border-black bg-transparent placeholder-black"
                placeholder="Correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>
            <div className="relative mb-8">
              <FaLock className="absolute top-1/2 -translate-y-1/2 left-2" />
              <input
                type={showPassword ? "text" : "password"}
                className="py-3 pl-8 pr-12 w-full outline-none border-b border-black bg-transparent placeholder-black"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <FaEyeSlash
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer"
                />
              ) : (
                <FaEye
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer"
                />
              )}
            </div>
            <button
              type="submit"
              className="text-center py-3 pl-8 pr-12 w-full outline-none bg-primary rounded-lg cursor-pointer text-texto-900 font-bold hover:bg-opacity-[90%] hover:text-white transition-all duration-400"
            >
              Ingresar
            </button>
          </form>
          <Link to="/recuperar-contrasena" className="mt-2">
            <span className="text-blue-500 hover:border-b hover:border-blue-500">¿Olvidaste tu contraseña?</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
