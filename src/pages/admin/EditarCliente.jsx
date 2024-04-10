import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
import Swal from "sweetalert2";

const EditarCliente = () => {
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [cliente, setCliente] = useState({
    nombre: "",
    telefono: "",
    correo: ""
  });
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/clientes');
        if (response.ok) {
          const data = await response.json();
          if (data && data.clientes && data.clientes.length > 0) {
            setClientes(data.clientes);
            // Asigna el primer cliente como el cliente inicial
            setClienteSeleccionado(data.clientes[0]._id);
          } else {
            console.error('No se encontraron clientes en la respuesta:', data);
          }
        } else {
          console.error('Error al obtener los clientes:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener los clientes:', error);
      }
    };

    obtenerClientes();
  }, []);

  useEffect(() => {
    const obtenerClienteSeleccionado = () => {
      const clienteAEditar = clientes.find(c => c._id === clienteSeleccionado); // Corrección aquí
      if (clienteAEditar) {
        setCliente({
          _id: clienteAEditar._id,
          nombre: clienteAEditar.nombre,
          telefono: clienteAEditar.telefono,
          correo: clienteAEditar.correo
        });
      }
    };

    obtenerClienteSeleccionado();
  }, [clientes, clienteSeleccionado]); // Se agrega clientes como dependencia

  const handleBuscarCliente = (e) => {
    const valorBusqueda = e.target.value;
    setBusqueda(valorBusqueda);

    // Filtrar clientes según la búsqueda
    const clienteEncontrado = clientes.find(c =>
      c.nombre.toLowerCase().includes(valorBusqueda.toLowerCase())
    );

    // Actualizar el estado del cliente seleccionado
    setClienteSeleccionado(clienteEncontrado ? clienteEncontrado._id : "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({
      ...cliente,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/clientes/${cliente._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: cliente.nombre,
          telefono: cliente.telefono,
          correo: cliente.correo
        })
      });
      if (response.ok) {
        Swal.fire("¡Cliente editado!", "", "success");
        setTimeout(() => {
          window.location.href = "/clientes";
        }, 2000);
      } else {
        Swal.fire("Error", "Hubo un problema al editar el cliente", "error");
      }
    } catch (error) {
      console.error('Error al editar el cliente:', error);
      Swal.fire("Error", "Hubo un problema al editar el cliente", "error");
    }
  };

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-10 pt-4">Editar cliente</h1>
      <div className="flex justify-center">
        <div className="w-full md:flex flex-col md:w-[60%]">
          <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
            <input
              type="text"
              placeholder="Buscar cliente"
              value={busqueda}
              onChange={handleBuscarCliente}
              className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
              <div className="relative">
                <FaUser className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="text"
                  placeholder="Nombre"
                  name="nombre"
                  value={cliente.nombre}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
                />
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
              <div className="relative">
                <FaPhone className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="text"
                  placeholder="Teléfono"
                  name="telefono"
                  value={cliente.telefono}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
                />
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
              <div className="relative">
                <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  name="correo"
                  value={cliente.correo}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
                />
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
              <button
                type="submit"
                className="w-full md:w-[43%]  px-3 py-3 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold"
              >
                Guardar cambios
              </button>
              <Link to="/clientes" className="w-full md:w-[43%]">
                <button className="w-full  px-3 py-3 rounded-lg bg-gray-600 text-white hover:bg-opacity-[80%] transition-colors font-bold">
                  Volver
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarCliente;
