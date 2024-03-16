import React, {useState} from 'react';
import { Link } from 'react-router-dom';

// Icons
import { FaUser, FaLock, FaEye, FaEyeSlash    } from "react-icons/fa";


const Login = () => {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='min-h-screen flex items-center justify-center'>
        <div className='bg-secondary-100 p-8 rounded-xl  w-auto lg:w-[450px]'>
          <h1 className='text-3xl text-center uppercase font-bold tracking-[5px] text-primary mb-8 '>Iniciar sesión</h1>
          <form className='mb-8'>
            <div className='relative mb-5'>
              <FaUser className='absolute top-1/2 -translate-y-1/2 left-2' />
              <input type='text' className='py-3 pl-8 pr-4  bg-secondary-900 w-full outline-none rounded-lg focus:border focus:border-primary' placeholder='Usuario'/>
            </div>
            <div className='relative mb-8'>
              <FaLock   className='absolute top-1/2 -translate-y-1/2 left-2'/>
              <input type={showPassword ? "text" : "password"} className='py-3 pl-8 pr-12  bg-secondary-900 w-full outline-none rounded-lg focus:border focus:border-primary' placeholder='Contraseña'/>
              {showPassword ? (
                <FaEyeSlash onClick={() => setShowPassword(!showPassword)} className='absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer'/>
              ):(
                <FaEye onClick={() => setShowPassword(!showPassword)} className='absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer'/>
              )}     
            </div>
            <div>
              <button type='submit' className='bg-primary w-full py-3 px-4 rounded-lg uppercase font-bold text-secondary-900 hover:bg-secondary-900 hover:text-white transition-all duration-400'>Ingresar</button>
            </div>
          </form>
          <div className='flex flex-col gap-4 items-center text-gray-100'>
              <Link to="/recuperar-contrasena" className='hover:text-primary transition.colors'>
               ¿Olvidates tu contraseña?
              </Link>
          </div>
        </div>
    </div>
  )
}

export default Login