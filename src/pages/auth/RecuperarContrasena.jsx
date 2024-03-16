import React from 'react';
import { Link } from 'react-router-dom';

// Icons
import { MdEmail } from "react-icons/md";


const RecuperarContrasena = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
        <div className='bg-secondary-100 p-8 rounded-xl  w-auto lg:w-[450px]'>
          <h1 className='text-3xl text-center uppercase font-bold tracking-[5px] text-primary mb-8 '>Recuperar contraseña</h1>
          <form className='mb-8'>
            <div className='relative mb-5'>
              <MdEmail  className='absolute top-1/2 -translate-y-1/2 left-2' />
              <input type='email' className='py-3 pl-8 pr-4  bg-secondary-900 w-full outline-none rounded-lg focus:border focus:border-primary' placeholder='Ingrese su correo'/>
            </div>
            <div>
              <button type='submit' className='bg-primary w-full py-3 px-4 rounded-lg uppercase font-bold text-secondary-900 hover:bg-secondary-900 hover:text-white transition-all duration-400'>Enviar código de recuperación</button>
            </div>
          </form>
          <div className='flex flex-col gap-4 items-center text-gray-100'>
              <Link to="/login" className='hover:text-primary transition.colors'>
               Volver
              </Link>
          </div>
        </div>
    </div>
  )
}

export default RecuperarContrasena