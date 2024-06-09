import React, { useState } from 'react';
import Swal from 'sweetalert2';

// Icons
import { IoMailSharp } from "react-icons/io5";
import { FaLock, FaBarcode  } from "react-icons/fa";

const CambiarContrasena = () => {
  const [formData, setFormData] = useState({
    correo: '',
    codigoRecuperacion: '',
    nuevaContrasena: '',
    confirmarContrasena: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validaciones
    const { correo, codigoRecuperacion, nuevaContrasena, confirmarContrasena } = formData;

    if (!correo) {
      Swal.fire('Error', 'El campo de correo es obligatorio.', 'error');
      return;
    }

    if (!codigoRecuperacion) {
      Swal.fire('Error', 'El código de recuperación es obligatorio.', 'error');
      return;
    }

    if (!nuevaContrasena) {
      Swal.fire('Error', 'La nueva contraseña es obligatoria.', 'error');
      return;
    }

    if (!confirmarContrasena) {
      Swal.fire('Error', 'Por favor, confirme la nueva contraseña.', 'error');
      return;
    }

    if (nuevaContrasena !== confirmarContrasena) {
      Swal.fire('Error', 'Las contraseñas no coinciden.', 'error');
      return;
    }

    // Validación de la contraseña: al menos 1 mayúscula, 1 minúscula, 1 número y mínimo 6 caracteres
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(nuevaContrasena)) {
      Swal.fire('Error', 'La contraseña debe tener al menos 1 mayúscula, 1 minúscula, 1 número y un mínimo de 6 caracteres.', 'error');
      return;
    }

    // Crear objeto para enviar
    const data = {
      correo,
      codigoRecuperacion,
      nuevaContrasena
    };

    // Enviar solicitud PUT
    fetch('http://localhost:8080/api/auth/cambiar-contrasena', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      if (result.ok) {
        Swal.fire('Contraseña cambiada', 'La contraseña ha sido cambiada exitosamente.', 'success').then(() => {
          window.location.href = '/login';
        });
      } else {
        Swal.fire('Error', result.msg, 'error');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      Swal.fire('Error', 'Hubo un problema al cambiar la contraseña.', 'error');
    });
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-secondary-100 p-8 rounded-xl w-auto lg:w-[450px]'>
      <h1 className='text-3xl text-center uppercase font-bold tracking-[5px] text-primary mb-8'>Cambiar Contraseña</h1>
      <form onSubmit={handleSubmit} className='mb-8'>
        <div className='mb-5'>
          <label htmlFor="correo" className='text-texto-100'>Correo:</label>
          <div className="relative">
          <IoMailSharp className='absolute top-1/2 -translate-y-1/2 left-2 text-texto-100' />
          <input
            type="email"
            className='py-3 pl-8 pr-4 text-texto-100 bg-secondary-900 w-full outline-none rounded-lg'
            id="correo"
            name="correo"
            placeholder='Example@123.com'
            value={formData.correo}
            onChange={handleChange}
          />
          </div>
        </div>
        <div className='mb-5'>
          <label htmlFor="codigoRecuperacion" className='text-texto-100'>Código de Recuperación:</label>
          <div className="relative">
          <FaBarcode className='absolute top-1/2 -translate-y-1/2 left-2 text-texto-100' />
          <input
            type="text"
            className='py-3 pl-8 pr-4 text-texto-100 bg-secondary-900 w-full outline-none rounded-lg'
            id="codigoRecuperacion"
            name="codigoRecuperacion"
            placeholder='ABC123'
            value={formData.codigoRecuperacion}
            onChange={handleChange}
          />
          </div>
        </div>
        <div className='mb-5'>
          <label htmlFor="nuevaContrasena" className='text-texto-100'>Nueva Contraseña:</label>
          <div className="relative">
          <FaLock className='absolute top-1/2 -translate-y-1/2 left-2 text-texto-100' />
          <input
            type="password"
            className='py-3 pl-8 pr-4 text-texto-100 bg-secondary-900 w-full outline-none rounded-lg'
            id="nuevaContrasena"
            name="nuevaContrasena"
            placeholder='******'
            value={formData.nuevaContrasena}
            onChange={handleChange}
          />
          </div>
        </div>
        <div className='mb-5'>
          <label htmlFor="confirmarContrasena" className='text-texto-100'>Confirmar Nueva Contraseña:</label>
          <div className="relative">
          <FaLock className='absolute top-1/2 -translate-y-1/2 left-2 text-texto-100' />
          <input
            type="password"
            className='py-3 pl-8 pr-4 text-texto-100 bg-secondary-900 w-full outline-none rounded-lg'
            id="confirmarContrasena"
            name="confirmarContrasena"
            placeholder='******'
            value={formData.confirmarContrasena}
            onChange={handleChange}
          />
          </div>
        </div>
        <button type="submit" className='bg-primary w-full py-3 px-4 rounded-lg uppercase font-bold text-texto-900 hover:bg-opacity-[90%] hover:text-white transition-all duration-400'>Cambiar Contraseña</button>
      </form>
      </div>
    </div>
  );
};

export default CambiarContrasena;
