import React, { useState, useEffect } from "react";
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
  const [clientesRegistrados, setClientesRegistrados] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({
      ...cliente,
      [name]: value,
    });
  };

  // Obtener todos los clientes registrados
  const obtenerClientesRegistrados = async () => {
    try {
      const response = await fetch('https://beautysalesbackend.onrender.com/api/clientes');
      const data = await response.json();
      setClientesRegistrados(data.clientes);
    } catch (error) {
      console.error('Error al obtener los clientes registrados:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cliente.nombre || !cliente.telefono || !cliente.correo) {
      return Swal.fire("Error", "Por favor, complete todos los campos", "error");
    }

    if (!/^[\wáéíóúÁÉÍÓÚ\s]+$/.test(cliente.nombre)) {
      return Swal.fire("Error", "El nombre solo puede contener letras y tildes", "error");
    }

    if (!/^(\d{10})$/.test(cliente.telefono)) {
      return Swal.fire("Error", "El teléfono debe tener 10 dígitos", "error");
    }

    if (!/^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(cliente.correo)) {
      return Swal.fire("Error", "El correo electrónico no es válido", "error");
    }

    // Convertir el correo electrónico a minúsculas
    cliente.correo = cliente.correo.toLowerCase();

    // Verificar si el correo y el teléfono ya existen
    if (clienteExistente(cliente)) {
      return;
    }

    // Si el correo y el teléfono no existen, enviar el formulario
    enviarFormulario(cliente);
  };

  // Verificar si el correo o el teléfono ya existen en los clientes registrados
  const clienteExistente = (cliente) => {

    if (clientesRegistrados.some(c => c.nombre === cliente.nombre)) {
      Swal.fire("Error", "El nombre ya esta registrado", "error");
      return true;
    }

    if (clientesRegistrados.some(c => c.telefono === cliente.telefono)) {
      Swal.fire("Error", "El teléfono ya está registrado", "error");
      return true;
    }

    if (clientesRegistrados.some(c => c.correo === cliente.correo)) {
      Swal.fire("Error", "El correo electrónico ya está registrado", "error");
      return true;
    }
    

    return false;
  };

  const enviarFormulario = async (cliente) => {
    try {
      // Solicitud POST para registrar el cliente en la API
      const response = await fetch('https://beautysalesbackend.onrender.com/api/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
      });

      if (response.ok) {
        Swal.fire("¡Cliente registrado!", "", "success");
        setTimeout(() => {
          window.location.href = "/clientes";
        }, 2000);
      } else {
        console.error('Error al registrar el cliente:', response.statusText);
        Swal.fire('Error', 'Hubo un problema al registrar el cliente', 'error');
      }
    } catch (error) {
      console.error('Error al registrar el cliente:', error);
      Swal.fire('Error', 'Hubo un problema al registrar el cliente', 'error');
    }
  };

  // Obtener los clientes registrados al cargar el componente
  useEffect(() => {
    obtenerClientesRegistrados();
  }, []);

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-10 pt-4 text-texto-100">Registrar cliente</h1>
      <div className="flex justify-center">
        <div className="w-full md:w-[90%]">
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
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
                    className="text-black w-full px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
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
                    className="text-black w-full px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
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
                  className="text-black w-full px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
                />
              </div>
            </div>
            <div className="w-full flex flex-col-reverse md:flex-row justify-center gap-12 mb-10">
              <Link to="/clientes" className="w-full md:w-[35%]">
                <button className="w-full px-3 py-3 rounded-lg bg-gray-600 text-white hover:bg-opacity-[80%] transition-colors font-bold">
                  Volver
                </button>
              </Link>
              <button
                type="submit"
                className="w-full md:w-[35%] px-3 py-3 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold"
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
