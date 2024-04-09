import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
import Swal from "sweetalert2";

const EditarCliente = () => {
  const [cliente, setCliente] = useState({
    nombre: "",
    telefono: "",
    correo: "",
  });

  useEffect(() => {
    // Simulación de carga de datos del cliente a editar
    // Aquí puedes hacer una llamada a la API para obtener los datos reales
    // En este ejemplo, cargamos los datos del cliente inicialmente
    setCliente({
      nombre: "Cliente de ejemplo",
      telefono: "123456789",
      correo: "cliente@example.com",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({
      ...cliente,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de función de edición del cliente
    // Aquí debes enviar los datos del cliente a la API para actualizarlos
    // En este ejemplo, mostramos una alerta de éxito y redirigimos a la página de clientes
    const { nombre, telefono, correo } = cliente;
    const objectId = "objectId_del_cliente"; // Reemplaza "objectId_del_cliente" con el objectId del cliente que estás editando
    fetch(`http://localhost:8080/api/clientes/${objectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, telefono, correo }),
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire("¡Cliente editado!", "", "success");
          setTimeout(() => {
            window.location.href = "/clientes";
          }, 2000);
        } else {
          Swal.fire("¡Error al editar cliente!", "", "error");
        }
      })
      .catch((error) => {
        console.error("Error al editar cliente:", error);
        Swal.fire("¡Error al editar cliente!", "", "error");
      });
  };

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-10 pt-4">Editar cliente</h1>
      <div className="flex justify-center">
        <div className="w-full md:flex flex-col md:w-[60%]">
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
