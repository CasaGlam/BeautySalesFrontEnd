import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Error404 = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className='bg-secondary-100 flex items-center justify-center h-[100vh]'>
      <div className='bg-secondary-900 w-[80vw] h-[80vh] rounded-lg flex flex-col items-center justify-center '>
        <div className='w-[30%] rounded-xl' style={{ backgroundImage: "url('/src/assets/img/bg-login.jpg')" }}>
          <img src="/src/assets/img/LogoBeautySales.png" alt="Beauty Sales" className=''/>
        </div>
        <h1 className='text-texto-100 font-bold text-6xl'>Error 404</h1>
        <h3 className='text-texto-100 font-semibold'>Página no encontrada!</h3>
        <button className='mt-5 text-texto-900 font-semibold bg-primary py-2 px-8 rounded-lg hover:bg-opacity-[90%]' onClick={handleGoBack}>
          Volver
        </button>
      </div>
    </div>
  )
}

export default Error404