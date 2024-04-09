import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const EditarProveedor = () => {
  const [proveedores, setProveedores] = useState([]);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState("");
  const [proveedor, setProveedor] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    direccion: "",
    descripcion: "",
    estado: false // Agregar estado por defecto
  });

  useEffect(() => {
    const obtenerProveedores = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/proveedores');
        if (response.ok) {
          const data = await response.json();
          if (data && data.proveedores && data.proveedores.length > 0) {
            setProveedores(data.proveedores);
            // Asigna el primer proveedor como el proveedor inicial
            setProveedorSeleccionado(data.proveedores[0]._id);
          } else {
            console.error('No se encontraron proveedores en la respuesta:', data);
          }
        } else {
          console.error('Error al obtener los proveedores:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener los proveedores:', error);
      }
    };

    obtenerProveedores();
  }, []);

  useEffect(() => {
    const obtenerProveedorSeleccionado = () => {
      const proveedorAEditar = proveedores.find(p => p._id === proveedorSeleccionado);
      if (proveedorAEditar) {
        setProveedor({
          ...proveedorAEditar
        });
      }
    };

    obtenerProveedorSeleccionado();
  }, [proveedores, proveedorSeleccionado]);

  const handleChangeProveedor = async (e) => {
    setProveedorSeleccionado(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProveedor({
      ...proveedor,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Guardar los datos del proveedor en una variable local
      const proveedorActualizado = { ...proveedor };
      const response = await fetch(`http://localhost:8080/api/proveedores/${proveedor._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(proveedorActualizado) // Enviar los datos actualizados
      });
      if (response.ok) {
        Swal.fire("¡Proveedor editado!", "", "success");
        setTimeout(() => {
          window.location.href = "/proveedores";
        }, 2000);
      } else {
        Swal.fire("Error", "Hubo un problema al editar el proveedor", "error");
      }
    } catch (error) {
      console.error('Error al editar el proveedor:', error);
      Swal.fire("Error", "Hubo un problema al editar el proveedor", "error");
    }
  };
  

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-10 pt-4">Editar proveedor</h1>
      <div className="flex justify-center">
        <div className="w-full md:flex flex-col md:w-[60%]">
          <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
            <select
              value={proveedorSeleccionado}
              onChange={handleChangeProveedor}
              className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
            >
              {proveedores.map(p => (
                <option key={p._id} value={p._id}>{p.nombre}</option>
              ))}
            </select>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
              <div className="relative">
                <FaUser className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="text"
                  placeholder="Nombre"
                  name="nombre"
                  value={proveedor.nombre}
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
                  value={proveedor.telefono}
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
                  value={proveedor.correo}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
                />
              </div>
              <div className="relative">
                <FaMapMarkerAlt className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="text"
                  placeholder="Dirección"
                  name="direccion"
                  value={proveedor.direccion}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
                />
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
              <div className="relative">
                <FaInfoCircle className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="text"
                  placeholder="Descripción"
                  name="descripcion"
                  value={proveedor.descripcion}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
                />
              </div>
              <div className="relative">
                <FaInfoCircle className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <select
                  name="estado"
                  value={proveedor.estado}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
                >
                  <option value={true}>Activo</option>
                  <option value={false}>Inactivo</option>
                </select>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
              <button
                type="submit"
                className="w-full md:w-[43%]  px-3 py-3 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold"
              >
                Guardar cambios
              </button>
              <Link to="/proveedores" className="w-full md:w-[43%]">
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

export default EditarProveedor;
