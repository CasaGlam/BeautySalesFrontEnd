import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { IoIosArrowDown } from "react-icons/io";
import { CiLogout } from "react-icons/ci";

const Header = ({ title }) => {
  return (
    <header className="h-[7vh] md:h-[10vh] border-b border-secondary-100 p-8 flex items-center justify-between">
      <h2>{title}</h2>
      <nav className="flex items-center gap-x-4">
        <Menu
          menuButton={
            <MenuButton className="flex items-center gap-x-2 hover:bg-secondary-100 py-2 px-4 rounded-lg">
              <img
                src="/src/assets/img/pfp.jpg"
                className="w-6 h-6 object-cover rounded-full"
              />
              <span>Administrador</span>
              <IoIosArrowDown />
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
                <span className="text-sm">Administrador</span>
                <span className="text-[10px] text-gray-400">
                  Admin@gmail.com
                </span>
              </div>
            </Link>
          </MenuItem>
          <hr className="my-4 border-gray-500" />
          <MenuItem className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900">
            <Link to="/" className="flex items-center gap-x-4 ">
              <CiLogout className="ml-[10px] text-primary object-cover rounded-full" />
              <div className="flex flex-col text-sm">
                <span className="text-sm">Cerrar sesión</span>
              </div>
            </Link>
          </MenuItem>
        </Menu>
      </nav>
    </header>
  );
};

export default Header;
