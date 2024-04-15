import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { obtenerDatosDesdeToken } from "../../functions/token";

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Llama a la función para obtener los datos del token cuando el componente se monta
    const datosUsuario = obtenerDatosDesdeToken();
    setUsuario(datosUsuario);
  }, []);

  return (
    <div className="bg-secondary-100 p-8 rounded-xl mb-10">
      <div className="mb-10 w-full flex items-center justify-center">
        <div className="rounded-full" style={{ backgroundImage: "url('src/assets/img/bg-login.jpg')" }}>
        <img
          src="src/assets/img/LogoBeautySales.png"
          className="w-40 h-40 rounded-full"
        />
        </div>
      </div>
      <hr className="mb-10 border-gray-500"/>
      <h3 className="text-xl text-white pb-10">Información de usuario</h3>
      <div className="bg-secondary-900 p-8 rounded-xl mb-10">
        <form>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p>Nombre</p>
            </div>
            <div className="flex-1 flex items-center">
              <div className="w-full">
                <input
                  type="text"
                  className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-100"
                  placeholder="Nombre"
                  value={usuario ? usuario.nombre : ''}
                  onChange={(e) => setUsuario({...usuario, nombre: e.target.value})}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p>Rol</p>
            </div>
            <div className="flex-1 flex items-center">
              <div className="w-full">
                <input
                  type="text"
                  className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-100"
                  placeholder="Rol"
                  value={usuario ? usuario.rol : ''}
                  onChange={(e) => setUsuario({...usuario, rol: e.target.value})}
                />
              </div>
            </div>
          </div>
          <hr className="m-8 border-gray-500/30 border-dashed"/>
          <div className="mb-10 flex flex-col md:flex-row md:items-center gap-y-4 justify-between">
            <div>
              <h5 className="text-gray-100 text-xl">Correo electrónico</h5>
              <p className="text-gray-500 text-sm">{usuario ? usuario.correo : ''}</p>
            </div>
            <div>
              <button className="w-full md:w-auto bg-[#3c3c3c] text-[#888888] py-3 px-4 rounded-lg hover:bg-black hover:text-white transition-colors duration-500">
                Cambiar email
              </button>
            </div>
          </div>
          
          <div className="mb-10 flex flex-col md:flex-row md:items-center gap-y-4 justify-between">
            <div>
              <h5 className="text-gray-100 text-xl">Contraseña</h5>
              <p className="text-gray-500 text-sm">*******</p>
            </div>
            <div>
              <button className="w-full md:w-auto bg-[#3c3c3c] text-[#888888] py-3 px-4 rounded-lg hover:bg-black hover:text-white  transition-colors duration-500">
                Cambiar contraseña
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="flex justify-end">
        <button className="mb-10 bg-primary text-black py-2 px-4 rounded-lg hover:bg-primary/80 transition-colors">Guardar</button>
      </div>
      <hr className="mb-10 border-gray-500"/>
      <h3 className="text-xl text-white pb-10">Información de la empresa</h3>
      <div className="mb-10 bg-secondary-900 p-8 rounded-xl">
        <form>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p>Nombre de la empresa</p>
            </div>
            <div className="flex-1 flex items-center">
              <div className="w-full">
                <input
                  type="text"
                  className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-100"
                  placeholder="Nombre"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p>Descripción</p>
            </div>
            <div className="flex-1 flex items-center">
              <div className="w-full">
                <textarea
                  className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-100 resize-none"
                  rows={4}
                  placeholder="Descripción de la empresa"
                  
                ></textarea>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p>Email de la empresa</p>
            </div>
            <div className="flex-1 flex items-center">
              <div className="w-full">
                <input
                  type="email"
                  className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-100"
                  placeholder="Correo electrónico"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p>Dirección</p>
            </div>
            <div className="flex-1 flex items-center">
              <div className="w-full">
                <input
                  type="text"
                  className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-100"
                  placeholder="Dirección de la empresa"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p>Teléfono</p>
            </div>
            <div className="flex-1 flex items-center">
              <div className="w-full">
                <input
                  type="number"
                  className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-100"
                  placeholder="Número de teléfono"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p>Celular</p>
            </div>
            <div className="flex-1 flex items-center">
              <div className="w-full">
                <input
                  type="number"
                  className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-100"
                  placeholder="Número de celular"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2">
            <div className="w-full md:w-1/4">
              <p>Página web</p>
            </div>
            <div className="flex-1 flex items-center">
              <div className="w-full">
                <input
                  type="url"
                  className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-100"
                  placeholder="URL de la web"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="flex justify-end">
        <button className="mb-10 bg-primary text-black py-2 px-4 rounded-lg hover:bg-primary/80 transition-colors">Guardar</button>
      </div>
    </div>
  );
};

export default Perfil;
