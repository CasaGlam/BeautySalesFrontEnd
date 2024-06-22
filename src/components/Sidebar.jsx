import React, { useState } from "react";
import { Link } from "react-router-dom";

// Icons
import { FaChartSimple, FaCartShopping } from "react-icons/fa6";
import { MdCategory, MdMenu } from "react-icons/md";
import { IoIosSettings, IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { HiUsers } from "react-icons/hi2";
import { FaTruck } from "react-icons/fa";
import { GiLipstick } from "react-icons/gi";

const Sidebar = ({ permisos }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showSubMenu1, setShowSubMenu1] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div
        className={`xl:h-[100vh] overflow-y-scroll fixed xl:static w-[80%] md:w-[40%] lg:w-[30%] xl:w-auto h-full top-0 bg-secondary-100 p-4 flex flex-col justify-between z-50 ${
          showMenu ? "left-0" : "-left-full"
        } transition-all`}
      >
        <div>
          
          <div className="flex flex-col justify-center items-center mb-10">
          <img src="/assets/img/BeautySales.png" alt="Logo" className="w-20 rounded-full border border-black"/>
          <h1 className="text-center text-2xl font-bold text-primary">
            Beauty sales
          </h1>
          </div>
          <ul>
            {permisos.includes("dashboard") && (
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-4 py-2 px-4 text-texto-100 rounded-lg hover:bg-secondary-900 transition-colors"
                >
                  <FaChartSimple className="text-texto-100" />
                  Dashboard
                </Link>
              </li>
            )}
            {permisos.includes("productos") && (
              <li>
                <Link
                  to="/productos"
                  className="flex items-center gap-4 py-2 px-4 text-texto-100 rounded-lg hover:bg-secondary-900 transition-colors"
                >
                  <GiLipstick className="text-texto-100" />
                  Productos
                </Link>
              </li>
            )}
            {permisos.includes("categorias") && (
              <li>
                <Link
                  to="/categorias"
                  className="flex items-center gap-4 py-2 px-4 text-texto-100 rounded-lg hover:bg-secondary-900 transition-colors"
                >
                  <MdCategory className="text-texto-100" />
                  Categorías
                </Link>
              </li>
            )}
            {(permisos.includes("ventas") || permisos.includes("compras")) && (
              <li>
                <button
                  onClick={() => setShowSubMenu(!showSubMenu)}
                  className="w-full flex items-center justify-between py-2 px-4 text-texto-100 rounded-lg hover:bg-secondary-900 transition-colors"
                >
                  <span className="flex items-center gap-4">
                    <FaCartShopping className="text-texto-100" />
                    Transacciones
                  </span>
                  <IoIosArrowDown
                    className={`mt-1 ${
                      showSubMenu && "rotate-180"
                    } transition-all`}
                  />
                </button>
                <ul className={`my-2 ${!showSubMenu && "hidden"}`}>
                  {permisos.includes("ventas") && (
                    <li>
                      <Link
                        to="/ventas"
                        className="py-2 px-4 border-l border-gray-500 text-texto-100 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-texto-100 transition-colors"
                      >
                        Ventas
                      </Link>
                    </li>
                  )}
                  {permisos.includes("compras") && (
                    <li>
                      <Link
                        to="/compras"
                        className="py-2 px-4 border-l border-gray-500 text-texto-100 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-texto-100 transition-colors"
                      >
                        Compras
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            )}
            {permisos.includes("proveedores") && (
              <li>
                <Link
                  to="/proveedores"
                  className="flex items-center gap-4 py-2 px-4 text-texto-100 rounded-lg hover:bg-secondary-900 transition-colors"
                >
                  <FaTruck className="text-texto-100" />
                  Proveedores
                </Link>
              </li>
            )}
            {permisos.includes("clientes") && (
              <li>
                <Link
                  to="/clientes"
                  className="flex items-center gap-4 py-2 px-4 text-texto-100 rounded-lg hover:bg-secondary-900 transition-colors"
                >
                  <HiUsers className="text-texto-100" />
                  Clientes
                </Link>
              </li>
            )}
            {(permisos.includes("usuarios") || permisos.includes("roles")) && (
              <li>
                <button
                  onClick={() => setShowSubMenu1(!showSubMenu1)}
                  className="w-full flex items-center justify-between py-2 text-texto-100 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
                >
                  <span className="flex items-center gap-4">
                    <IoIosSettings className="text-texto-100" />
                    Configuración
                  </span>
                  <IoIosArrowDown
                    className={`mt-1 ${
                      showSubMenu1 && "rotate-180"
                    } transition-all`}
                  />
                </button>
                <ul className={`my-2 ${!showSubMenu1 && "hidden"}`}>
                  {permisos.includes("usuarios") && (
                    <li>
                      <Link
                        to="/usuarios"
                        className="py-2 px-4 border-l border-gray-500 ml-6 text-texto-100 block relative before:w-3 before:h-3 before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-texto-100 transition-colors"
                      >
                        Usuarios
                      </Link>
                    </li>
                  )}
                  {permisos.includes("roles") && (
                    <li>
                      <Link
                        to="/roles"
                        className="py-2 px-4 border-l border-gray-500 ml-6 text-texto-100 block relative before:w-3 before:h-3 before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-texto-100 transition-colors"
                      >
                        Roles
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="xl:hidden fixed bottom-4 right-4 bg-primary text-black p-3 rounded-full z-50"
      >
        {showMenu ? <IoClose /> : <MdMenu />}
      </button>
    </>
  );
};

export default Sidebar;
