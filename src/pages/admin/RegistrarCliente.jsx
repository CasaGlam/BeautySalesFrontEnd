import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
import Swal from "sweetalert2";

const RegistrarCliente = () => {
  const clienteInicial = {
    nombre: "",
    telefono: "",
    correo: "",
  };

  const [cliente, setCliente] = useState(clienteInicial);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({
      ...cliente,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cliente.nombre || !cliente.telefono || !cliente.correo) {
      Swal.fire("Error", "Por favor, complete todos los campos", "error");
      return;
    }
    // Solicitud POST para registrar el cliente en la API
    fetch('http://localhost:8080/api/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cliente)
    })
    .then(response => {
      if (response.ok) {
        Swal.fire("¡Cliente registrado!", "", "success");
        setTimeout(() => {
          window.location.href = "/clientes";
        }, 2000);
        // Puedes agregar aquí el código para redirigir a la página de clientes después del registro
      } else {
        console.error('Error al registrar el cliente:', response.statusText);
        Swal.fire(
          'Error',
          'Hubo un problema al registrar el cliente',
          'error'
        );
      }
    })
    .catch(error => {
      console.error('Error al registrar el cliente:', error);
      Swal.fire(
        'Error',
        'Hubo un problema al registrar el cliente',
        'error'
      );
    });
  };

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-10 pt-4 text-texto-100">Registrar cliente</h1>
      <div className="flex justify-center">
        <div className="w-full md:w-[60%]">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex flex-col">
                <label htmlFor="nombre" className="text-gray-600 font-semibold mb-2">Nombre</label>
                <div className="relative">
                  <FaUser className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                  <input
                    type="text"
                    id="nombre"
                    placeholder="Nombre"
                    name="nombre"
                    value={cliente.nombre}
                    onChange={handleChange}
                    className="text-black px-2 py-3 rounded-lg pl-8 pr-8 bg-secondary-900"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="telefono" className="text-gray-600 font-semibold mb-2">Teléfono</label>
                <div className="relative">
                  <FaPhone className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                  <input
                    type="text"
                    id="telefono"
                    placeholder="Teléfono"
                    name="telefono"
                    value={cliente.telefono}
                    onChange={handleChange}
                    className="text-black px-2 py-3 rounded-lg pl-8 pr-8 bg-secondary-900"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <label htmlFor="correo" className="text-gray-600 font-semibold mb-2">Correo electrónico</label>
              <div className="relative">
                <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="email"
                  id="correo"
                  placeholder="Correo electrónico"
                  name="correo"
                  value={cliente.correo}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 bg-secondary-900"
                />
              </div>
            </div>
            <div className="flex justify-between mb-6">
              <Link to="/clientes" className="w-[45%]">
                <button className="w-full px-4 py-3 rounded-lg bg-gray-600 text-white hover:bg-opacity-[80%] transition-colors font-bold">
                  Volver
                </button>
              </Link>
              <button
                type="submit"
                className="w-[45%] px-4 py-3 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold"
              >
                Registrar cliente
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrarCliente;
