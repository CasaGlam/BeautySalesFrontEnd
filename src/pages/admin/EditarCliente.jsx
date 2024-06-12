import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

// Icons
import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";

const EditarCliente = () => {
  const [cliente, setCliente] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    estado: false
  });

  const { objectId } = useParams();

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/clientes/${objectId}`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos del cliente');
        }
        const data = await response.json();
        setCliente(data.cliente);
      } catch (error) {
        console.error("Error fetching cliente:", error);
      }
    };

    fetchCliente();

  }, [objectId]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setCliente({
      ...cliente,
      [e.target.name]: value
    });
  };

  const handleActualizarCliente = async () => {
    // Validar campos
    if (
      !cliente.nombre.match(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/) ||
      cliente.telefono.trim().length !== 10 ||
      !/^\d+$/.test(cliente.telefono) ||
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(cliente.correo)
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        text: 'Por favor, verifica los campos del formulario.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    // Verificar si el correo o el teléfono ya están registrados
    try {
      const response = await fetch(`http://localhost:8080/api/clientes`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos de los clientes');
      }
      const data = await response.json();
      
      // Filtrar los clientes excluyendo al que se está editando
      const clientesFiltrados = data.clientes.filter(c => c._id !== objectId);

      // Verificar duplicados solo en los clientes filtrados
      const clienteExistente = clientesFiltrados.find(
        c => (c.telefono === cliente.telefono || c.correo === cliente.correo) || c.nombre === cliente.nombre
      );

      if (clienteExistente) {
        Swal.fire({
          icon: 'error',
          title: 'Error de validación',
          text: 'El nombre, correo o el teléfono ya están registrados.',
          confirmButtonColor: '#3085d6',
        });
        return;
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error al verificar cliente existente',
        text: 'Hubo un problema al verificar si el cliente ya está registrado. Por favor, inténtalo de nuevo más tarde.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    // Realizar la solicitud PUT para actualizar el cliente
    fetch(`http://localhost:8080/api/clientes/${objectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cliente)
    })
    .then(response => {
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Cliente actualizado!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          // Redireccionar al usuario a la ruta /clientes
          window.location.href = '/clientes';
        });
      } else {
        throw new Error("Error al actualizar cliente");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar cliente',
        text: 'Hubo un problema al actualizar el cliente. Por favor, inténtalo de nuevo más tarde.',
        confirmButtonColor: '#3085d6',
      });
    });
  };

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-10 pt-4 text-texto-100">Editar cliente</h1>
      <div className="flex justify-center">
        <div className="w-full md:flex flex-col md:w-[90%]">
          <div className="w-full flex flex-col gap-12 mb-10">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="w-full">
                <label htmlFor="nombre" className="text-texto-100 mb-2 block">Nombre</label>
                <div className="relative">
                  <FaUser className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                  <input
                    type="text"
                    placeholder="Nombre del cliente"
                    className="text-black w-full px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
                    name="nombre"
                    value={cliente.nombre}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-full">
                <label htmlFor="telefono" className="text-texto-100 mb-2 block">Teléfono</label>
                <div className="relative">
                  <FaPhone className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    className="text-black w-full px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
                    name="telefono"
                    value={cliente.telefono}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-12">
              <div className="w-full">
                <label htmlFor="correo" className="text-texto-100 mb-2 block">Correo electrónico</label>
                <div className="relative">
                  <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="text-black w-full px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
                    name="correo"
                    value={cliente.correo}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-full">
                <label htmlFor="estado" className="text-texto-100 mb-2 block">Estado</label>
                <select
                  name="estado"
                  value={cliente.estado}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg bg-secondary-900 w-full"
                >
                  <option value={true}>Activo</option>
                  <option value={false}>Inactivo</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-center gap-12 mb-10">
            <Link to="/clientes" className="w-full md:w-[35%]">
              <button className="w-full px-3 py-3 rounded-lg bg-gray-600 text-white hover:bg-opacity-[80%] transition-colors font-bold">
                Volver
              </button>
            </Link>
            <button
              className="w-full md:w-[35%] px-3 py-3 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold"
              onClick={handleActualizarCliente}
            >
              Actualizar cliente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarCliente;
