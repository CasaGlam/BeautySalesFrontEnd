import React, { useState } from "react";
import { Link } from "react-router-dom";

// Icons
import { FaChartSimple, FaCartShopping } from "react-icons/fa6";
import { MdCategory, MdMenu } from "react-icons/md";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { IoIosSettings, IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { HiUsers } from "react-icons/hi2";

const Sidebar = () => {
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
          <h1 className="text-center text-2xl font-bold text-white mb-10">
            Beauty sales<span className="text-primary text-4xl">.</span>
          </h1>
          <ul>
            <li>
              <Link
                to="/"
                className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <FaChartSimple className="text-primary" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <MdCategory className="text-primary" />
                Categorías
              </Link>
            </li>
            <li>
              <button
                onClick={() => setShowSubMenu(!showSubMenu)}
                className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <span className="flex items-center gap-4">
                  <FaCartShopping className="text-primary" />
                  Transacciones
                </span>
                <IoIosArrowDown
                  className={`mt-1 ${
                    showSubMenu && "rotate-180"
                  } transition-all`}
                />
              </button>
              <ul className={`my-2 ${!showSubMenu && "hidden"}`}>
                <li>
                  <Link
                    to="/"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors"
                  >
                    Ventas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors"
                  >
                    Compras
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                to="/proveedores"
                className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <GiCardboardBoxClosed className="text-primary" />
                Proveedores
              </Link>
            </li>
            <li>
              <Link
                to="/proveedores"
                className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <HiUsers className="text-primary" />
                Clientes
              </Link>
            </li>
            <li>
              <button
                onClick={() => setShowSubMenu1(!showSubMenu1)}
                className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <span className="flex items-center gap-4">
                  <IoIosSettings className="text-primary" />
                  Configuración
                </span>
                <IoIosArrowDown
                  className={`mt-1 ${
                    showSubMenu1 && "rotate-180"
                  } transition-all`}
                />
              </button>
              <ul className={`my-2 ${!showSubMenu1 && "hidden"}`}>
                <li>
                  <Link
                    to="/"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors"
                  >
                    Usuarios
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors"
                  >
                    Roles
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <nav>
          <Link
            to="/"
            className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
          >
            <CiLogout className="text-primary" />
            Cerrar sesión
          </Link>
        </nav>
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
