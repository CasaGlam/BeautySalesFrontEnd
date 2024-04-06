import React from "react";
import { Link } from "react-router-dom";

// Icons
import { FaUser, FaLock, FaCheck } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const RegistrarRol = () => {
  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-10 pt-4">Registrar rol nuevo</h1>
      <div className="flex justify-center">
        <div className="w-full md:flex flex-col md:w-[60%]">
          <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
            <div className="relative">
              <FaUser className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
              <input
                type="text"
                placeholder="Nombre de rol"
                className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <h2 className="text-3xl font-bold">Permisos</h2>
          </div>
          <div className="w-full flex  items-center justify-center gap-12 mb-10 mt-10 border border-white rounded-lg">
              <div className="flex flex-col p-4 ">
              <div className="flex justify-between  p-4 gap-4">
                <label htmlFor="dashboard" className="">Dashboard</label>
                <input type="checkbox" name="dashboard" id="dashboard" />
              </div>
              <div className="flex justify-between  p-4 gap-4">
                <label htmlFor="productos" className="">Productos</label>
                <input type="checkbox" name="productos" id="productos" />
              </div>
              <div className="flex justify-between  p-4 gap-4">
                <label htmlFor="categorias" className="">Categorías</label>
                <input type="checkbox" name="categorias" id="categorias" />
              </div>
            </div>
            <div className="flex flex-col p-4">
              <div className="flex justify-between  p-4 gap-4">
                <label htmlFor="compras" className="">Compras</label>
                <input type="checkbox" name="compras" id="compras" />
              </div>
              <div className="flex justify-between  p-4 gap-4">
                <label htmlFor="ventas" className="">Ventas</label>
                <input type="checkbox" name="ventas" id="ventas" />
              </div>
              <div className="flex justify-between  p-4 gap-4">
                <label htmlFor="proveedores" className="">Proveedores</label>
                <input type="checkbox" name="proveedores" id="proveedores" />
              </div>
            </div>
            <div className="flex flex-col p-4">
              <div className="flex justify-between  p-4 gap-4">
                <label htmlFor="clientes" className="">Clientes</label>
                <input type="checkbox" name="clientes" id="clientes" />
              </div>
              <div className="flex justify-between  p-4 gap-4">
                <label htmlFor="usuarios" className="">Usuarios</label>
                <input type="checkbox" name="usuarios" id="usuarios" />
              </div>
              <div className="flex justify-between  p-4 gap-4">
                <label htmlFor="roles" className="">Roles</label>
                <input type="checkbox" name="roles" id="roles" />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
            <button className="w-full md:w-[43%]  px-3 py-3 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold">
              Crear rol
            </button>
            <Link to="/roles" className="w-full md:w-[43%]">
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

export default RegistrarRol;
