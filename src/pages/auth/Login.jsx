import React, { useState, useEffect  } from "react";
import { Link } from "react-router-dom";
import { useWindowSize } from "react-use";

// Icons
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { width } = useWindowSize(); // Obtiene el ancho de la ventana

  useEffect(() => {
    // Oculta el div con id "Prueba" si el ancho de la ventana es menor a 900px
    const pruebaDiv = document.getElementById("Prueba");
    if (width < 1300 && pruebaDiv) {
      pruebaDiv.style.display = "none";
    } else if (pruebaDiv) {
      pruebaDiv.style.display = "block";
    }
  }, [width]);

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div
        className="w-[90vw] h-[90vh] rounded-lg flex justify-center"
        style={{ backgroundImage: "url('src/assets/img/bg-login.jpg')" }}
      >
        <div
          className="w-[40%]  h-[100%] border-r border-black"
          style={{
            backgroundImage: "url('src/assets/img/LogoBeautySales.png')",
            backgroundRepeat: "no-repeat",
          }}
          id="Prueba"
        ></div>
        <div className="text-black  w-[60%] flex flex-col justify-center items-center backdrop-blur-sm rounded-lg">
          <h1 className="text-5xl font-bold mb-10">Bienvenido</h1>
          {/*<h5 className="font-bold mb-10">A Beauty sales</h5>*/}
          <hr className=" border-black h-px w-[95%]" />
          <h2 className="text-4xl font-bold mb-10 mt-10">Iniciar sesión</h2>
          <form className=" w-[80%]">
            <div className="relative mb-8">
              <FaUser className="absolute top-1/2 -translate-y-1/2 left-2" />
              <input
                type="text"
                className="py-3 pl-8 pr-12 w-full outline-none border-b border-black bg-transparent placeholder-black"
                placeholder="Correo"
              />
            </div>
            <div className="relative mb-8">
              <FaLock className="absolute top-1/2 -translate-y-1/2 left-2 " />
              <input
                type={showPassword ? "text" : "password"}
                className="py-3 pl-8 pr-12  w-full outline-none border-b border-black bg-transparent placeholder-black"
                placeholder="Contraseña"
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
            <input
              type="button"
              className=" text-center py-3 pl-8 pr-12  w-full outline-none bg-primary rounded-lg cursor-pointer font-semibold"
              value="Ingresar"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
