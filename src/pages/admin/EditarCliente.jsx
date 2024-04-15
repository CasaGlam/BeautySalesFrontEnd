import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const EditarCliente = () => {
  const [cliente, setCliente] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    estado: ""
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

  const handleActualizarCliente = () => {
    // Verificar que ningún campo esté vacío
    if (
      cliente.nombre.trim() === "" ||
      cliente.telefono.trim() === "" ||
      cliente.correo.trim() === ""
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
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
          // Realizar otras acciones necesarias en caso de éxito
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
      <h1 className="text-2xl font-bold mb-10 pt-4">Editar cliente</h1>
      <div className="flex justify-center">
        <div className="w-full md:flex flex-col md:w-[60%]">
          <div className="w-full flex md:flex-row flex-col gap-4 mb-10">
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <label htmlFor="nombre" className="text-white font-bold">Nombre del cliente</label>
              <input
                type="text"
                id="nombre"
                placeholder="Nombre del cliente"
                className="text-black px-2 py-3 rounded-lg"
                name="nombre"
                value={cliente.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <label htmlFor="telefono" className="text-white font-bold">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                placeholder="Teléfono"
                className="text-black px-2 py-3 rounded-lg"
                name="telefono"
                value={cliente.telefono}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full flex md:flex-row flex-col gap-4 mb-10">
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <label htmlFor="correo" className="text-white font-bold">Correo electrónico</label>
              <input
                type="email"
                id="correo"
                placeholder="Correo electrónico"
                className="text-black px-2 py-3 rounded-lg"
                name="correo"
                value={cliente.correo}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <label htmlFor="estado" className="text-white font-bold">Estado</label>
              <select
                id="estado"
                className="text-black px-2 py-3 rounded-lg"
                name="estado"
                value={cliente.estado}
                onChange={handleChange}
              >
                <option value={true}>Activo</option>
                <option value={false}>Inactivo</option>
              </select>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
          <button
              className="w-full md:w-[43%] px-3 py-3 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold"
              onClick={handleActualizarCliente}
            >
              Actualizar
            </button>
            <Link to="/clientes" className="w-full md:w-[43%]">
              <button className="w-full px-3 py-3 rounded-lg bg-gray-600 text-white hover:bg-opacity-[80%] transition-colors font-bold">
                Volver
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarCliente;
