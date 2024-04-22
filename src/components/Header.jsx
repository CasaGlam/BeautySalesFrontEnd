import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { IoIosArrowDown } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { obtenerDatosDesdeToken } from "../functions/token";

const Header = ({ title }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Llama a la función para obtener los datos del token cuando el componente se monta
    const datosUsuario = obtenerDatosDesdeToken();
    setUsuario(datosUsuario);
  }, []);

  const handleLogout = () => {
    // Borra el token del localStorage
    localStorage.removeItem('token');
  };

  return (
    <header className="h-[7vh] md:h-[10vh] border-b border-secondary-100 p-8 flex items-center justify-between bg-secondary-900">
      <h2 className='text-texto-100 font-bold'>{title}</h2>
      <nav className="flex items-center gap-x-4">
        {usuario ? (
          <Menu
            menuButton={
              <MenuButton className="flex items-center gap-x-2 hover:bg-secondary-100 py-2 px-4 rounded-lg">
                <img
                  src="/src/assets/img/pfp.jpg"
                  className="w-6 h-6 object-cover rounded-full"
                />
                <span className='text-texto-100 font-bold'>{usuario.nombre}</span>
                <IoIosArrowDown className='text-texto-100'/>
              </MenuButton>
            }
            transition
            menuClassName="bg-secondary-100 p-4"
          >
            <MenuItem className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900">
              <Link to="/perfil" className="flex items-center gap-x-4 ">
                <img
                  src="/src/assets/img/pfp.jpg"
                  className="w-8 h-8 object-cover rounded-full"
                />
                <div className="flex flex-col text-sm">
                  <span className="text-sm text-texto-100 font-bold">{usuario.nombre}</span>
                  <span className="text-[10px] text-gray-500 font-bold">
                    {usuario.correo}
                  </span>
                </div>
              </Link>
            </MenuItem>
            <hr className="my-4 border-gray-500" />
            <MenuItem className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900">
              <Link to="/login" className="flex items-center gap-x-4 " onClick={handleLogout}>
                <CiLogout className="ml-[10px] text-primary object-cover rounded-full " />
                <div className="flex flex-col text-sm">
                  <span className="text-sm text-texto-100 font-bold">Cerrar sesión</span>
                </div>
              </Link>
            </MenuItem>
          </Menu>
        ) : (
          null
        )}
      </nav>
    </header>
  );
};

export default Header;
