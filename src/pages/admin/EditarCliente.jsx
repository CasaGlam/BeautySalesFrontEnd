import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const EditarCliente = () => {
  const [cliente, setCliente] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    estado: false // Estado inicial como un booleano
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
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value
    });
  };

  const handleActualizarCliente = () => {
    // Verificar que ningún campo esté vacío
    if (
      cliente.nombre.trim() === "" ||
      cliente.telefono.trim() === "" ||
      cliente.correo.trim() === "" ||
      cliente.estado === ""
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
      <h1 className="text-2xl font-bold mb-10 pt-4 text-texto-100">Editar cliente</h1>
      <div className="flex justify-center">
        <div className="w-full md:flex flex-col md:w-[60%]">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nombre" className="block text-black font-bold mb-1">Nombre del cliente</label>
                <input
                  type="text"
                  placeholder="Nombre del cliente"
                  className="text-black px-4 py-3 rounded-lg bg-secondary-900 w-full"
                  name="nombre"
                  value={cliente.nombre}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="telefono" className="block text-black font-bold mb-1">Teléfono</label>
                <input
                  type="text"
                  placeholder="Teléfono"
                  className="text-black px-4 py-3 rounded-lg bg-secondary-900 w-full"
                  name="telefono"
                  value={cliente.telefono}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="correo" className="block text-black font-bold mb-1">Correo electrónico</label>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="text-black px-4 py-3 rounded-lg bg-secondary-900 w-full"
                  name="correo"
                  value={cliente.correo}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="estado" className="block text-black font-bold mb-1">Estado</label>
                <select
                  name="estado"
                  value={cliente.estado}
                  onChange={handleChange}
                  className="text-black px-4 py-3 rounded-lg bg-secondary-900 w-full"
                >
                  <option value={true}>Activo</option>
                  <option value={false}>Inactivo</option>
                </select>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10 my-4">
              <Link to="/clientes" className="w-full md:w-[50%]">
                <button className="w-full px-3 py-3 rounded-lg bg-gray-600 text-white hover:bg-opacity-[80%] transition-colors font-bold">
                  Volver
                </button>
              </Link>
              <button
                className="w-full md:w-[47%] px-3 py-3 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold"
                onClick={handleActualizarCliente}
              >
                Actualizar cliente
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarCliente;
