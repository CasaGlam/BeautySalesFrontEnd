import React from "react";
import { Link } from "react-router-dom";


// Icons
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const RegistrarUsuario = () => {
  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-10 pt-4">Registrar usuario nuevo</h1>
      <div className="flex justify-center">
        <div className="w-full md:flex flex-col md:w-[60%]">
          <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
            <div className="relative">
              <FaUser className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
              <input
                type="text"
                placeholder="Nombre de usuario"
                className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
              />
            </div>
            <div className="relative">
              <MdEmail className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
              <input
                type="email"
                placeholder="Correo electrónico"
                className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
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
              />
            </div>
            <div className='relative'>
            <FaLock className='absolute top-1/2 -translate-y-1/2 left-2 text-black'/>
            <input type="password" placeholder='Confirmar contraseña' className='text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12'/>
            </div> 
          </div>
          <div className="flex justify-center gap-12 mb-10">
            <select
              name=""
              id=""
              className="text-black px-2 py-3 rounded-lg pl-2 pr-20 md:pl-8 md:pr-12"
            >
              <option value="">Seleccione un rol</option>
              <option value="administrador">Administrador</option>
              <option value="subadministrador">Sub-Administrador</option>
              <option value="empleado">Empleado</option>
            </select>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
          <button className="w-full md:w-[43%]  px-3 py-3 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold">
              Crear usuario
            </button>
            <Link
                to="/usuarios"
                className="w-full md:w-[43%]"
              >
            <button className="w-full  px-3 py-3 rounded-lg bg-gray-600 text-white hover:bg-opacity-[80%] transition-colors font-bold">
              Volver
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrarUsuario;
