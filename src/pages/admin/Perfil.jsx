import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { obtenerDatosDesdeToken } from "../../functions/token";

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [empresa, setEmpresa] = useState({
    nombre: "",
    descripcion: "",
    email: "",
    direccion: "",
    telefono: "",
    celular: "",
    web: "",
  });

  useEffect(() => {
    // Llama a la función para obtener los datos del token cuando el componente se monta
    const datosUsuario = obtenerDatosDesdeToken();
    setUsuario(datosUsuario);

    // Trae los datos de la empresa
    const fetchEmpresa = async () =>{
      try{
        const response = await fetch(
          `http://localhost:8080/api/empresa/6628edfd2d05b66ef04ef368`
        );
        if(!response.ok){
          throw new Error("Error al obtener los datos del usuario");
        }
        const data = await response.json();
        setEmpresa(data.empresa)
      }catch(error){
        console.error("Error fetching info: ", error);
      }
    };

    fetchEmpresa();

  }, []);
  
  const handleChange = (e) => {
    setEmpresa({
      ...empresa,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <div className="bg-secondary-100 p-8 rounded-xl mb-10">
      <div className="mb-10 w-full flex items-center justify-center">
        <div className="rounded-full border border-black" style={{ backgroundImage: "url('src/assets/img/bg-login.jpg')" }}>
        <img
          src="src/assets/img/BeautySales.png"
          className="w-40 h-40 rounded-full"
        />
        </div>
      </div>
      <hr className="mb-10 border-gray-500"/>
      <h3 className="text-xl text-texto-100 pb-10">Información de usuario</h3>
      <div className="bg-secondary-900 p-8 rounded-xl mb-10">
        <form>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p className='text-texto-100'>Nombre</p>
            </div>
            <div className="flex-1 flex items-center">
              <div className="w-full">
                <input
                  type="text"
                  className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-100 text-texto-100"
                  placeholder="Nombre"
                  value={usuario ? usuario.nombre : ''}
                  onChange={(e) => setUsuario({...usuario, nombre: e.target.value})}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p className='text-texto-100'>Rol</p>
            </div>
            <div className="flex-1 flex items-center">
              <div className="w-full">
                <input
                  type="text"
                  className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-100 text-texto-100"
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
              <h5 className="text-texto-100 text-xl">Correo electrónico</h5>
              <p className="text-gray-500 text-sm">{usuario ? usuario.correo : ''}</p>
            </div>
            <div>
              <button className="w-full md:w-[200px] bg-gray-400 text-texto-100 py-3 px-4 rounded-lg hover:bg-primary hover:text-texto-900 transition-colors duration-500">
                Cambiar email
              </button>
            </div>
          </div>
          
          <div className="mb-10 flex flex-col md:flex-row md:items-center gap-y-4 justify-between">
            <div>
              <h5 className="text-texto-100 text-xl">Contraseña</h5>
              <p className="text-gray-500 text-sm">*******</p>
            </div>
            <div>
              <button className="w-full md:w-[200px] bg-gray-400 text-texto-100 py-3 px-4 rounded-lg hover:bg-primary hover:text-texto-900 transition-colors duration-500">
                Cambiar contraseña
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="flex justify-end">
        <button className="mb-10 bg-primary text-texto-900 font-bold py-2 px-4 rounded-lg hover:bg-primary/80 transition-colors">Guardar</button>
      </div>
    </div>
  );
};

export default Perfil;
