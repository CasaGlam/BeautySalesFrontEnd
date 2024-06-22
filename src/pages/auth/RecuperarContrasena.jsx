import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import Swal from 'sweetalert2';

const RecuperarContrasena = () => {
  const [correo, setCorreo] = useState('');

  const handleChange = (e) => {
    setCorreo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que el correo no esté vacío y tenga un formato válido
    if (!correo.trim()) {
      Swal.fire("¡Error!", "El campo 'Correo' no puede estar vacío.", "error");
      return;
    }

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(correo)) {
      Swal.fire("¡Error!", "El correo electrónico no tiene un formato válido.", "error");
      return;
    }

    // Hacer la solicitud POST a la API
    fetch('https://beautysalesbackend.onrender.com/api/auth/recuperar-contrasena', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correo }),
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire("¡Éxito!", "El código se envió al correo.", "success").then(() => {
            window.location.href = '/cambiar-contrasena';
          });
        } else {
          throw new Error("El correo no está registrado.");
        }
      })
      .catch((error) => {
        Swal.fire("¡Error!", "El correo no está registrado.", "error");
        console.error("Error al enviar el correo:", error);
      });
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-secondary-100 p-8 rounded-xl w-auto lg:w-[450px]'>
        <h1 className='text-3xl text-center uppercase font-bold tracking-[5px] text-primary mb-8'>Recuperar contraseña</h1>
        <form onSubmit={handleSubmit} className='mb-8'>
          <div className='mb-5'>
            <label htmlFor="" className='text-texto-100'>Correo:</label>
           <div className='relative'>
           <MdEmail className='absolute top-1/2 -translate-y-1/2 left-2 text-texto-100' />
            <input
              type='email'
              className='py-3 pl-8 pr-4 text-texto-100 bg-secondary-900 w-full outline-none rounded-lg'
              placeholder='Ingrese su correo'
              value={correo}
              onChange={handleChange}
            />
           </div>
          </div>
          <div>
            <button type='submit' className='bg-primary w-full py-3 px-4 rounded-lg uppercase font-bold text-texto-900 hover:bg-opacity-[90%] hover:text-white transition-all duration-400'>Enviar código de recuperación</button>
          </div>
        </form>
        <div className='flex flex-col gap-4 items-center text-gray-100'>
          <Link to="/login" className='w-full px-3 py-3 rounded-lg bg-gray-600 text-white hover:bg-opacity-[80%] transition-colors font-bold text-center'>
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecuperarContrasena;
