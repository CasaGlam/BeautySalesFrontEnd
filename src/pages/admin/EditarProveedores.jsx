import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

// Icons
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";


const EditarProveedor = () => {
  const [proveedor, setProveedor] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    direccion: "",
    descripcion: "",
    estado: false // Estado inicial como un booleano
  });

  const { objectId } = useParams();
  const [proveedoresExistente, setProveedoresExistente] = useState([]);

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await fetch('https://beautysalesbackend.onrender.com/api/proveedores');
        if (!response.ok) {
          throw new Error('Error al obtener los proveedores');
        }
        const data = await response.json();
        setProveedoresExistente(data.proveedores);
      } catch (error) {
        console.error("Error fetching proveedores:", error);
      }
    };

    fetchProveedores();

  }, []);

  useEffect(() => {
    const fetchProveedor = async () => {
      try {
        const response = await fetch(`https://beautysalesbackend.onrender.com/api/proveedores/${objectId}`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos del proveedor');
        }
        const data = await response.json();
        setProveedor(data.proveedor);
      } catch (error) {
        console.error("Error fetching proveedor:", error);
      }
    };

    fetchProveedor();

  }, [objectId]);

  const handleChange = (e) => {
    setProveedor({
      ...proveedor,
      [e.target.name]: e.target.value
    });
  };

  const handleActualizarProveedor = () => {
    // Verificar que ningún campo esté vacío
    if (
      proveedor.nombre.trim() === "" ||
      proveedor.telefono.trim() === "" ||
      proveedor.correo.trim() === "" ||
      proveedor.direccion.trim() === "" ||
      proveedor.estado === ""
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    // Validar el formato del teléfono
    const telefonoRegex = /^\d{10}$/;
    if (!telefonoRegex.test(proveedor.telefono)) {
      Swal.fire({
        icon: 'error',
        title: 'Teléfono inválido',
        text: 'El teléfono debe contener 10 números sin espacios ni caracteres especiales.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    // Validar el formato del correo electrónico
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(proveedor.correo)) {
      Swal.fire({
        icon: 'error',
        title: 'Correo electrónico inválido',
        text: 'Por favor, ingresa un correo electrónico válido.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    // Validar si el nombre, teléfono, correo y dirección ya están registrados
    const proveedorExistente = proveedoresExistente.find(p => p._id !== objectId && (p.nombre === proveedor.nombre || p.telefono === proveedor.telefono || p.correo === proveedor.correo || p.direccion === proveedor.direccion));
    if (proveedorExistente) {
      Swal.fire({
        icon: 'error',
        title: 'Proveedor ya registrado',
        text: 'El nombre, teléfono, correo o dirección ya están registrados en la base de datos.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    // Realizar la solicitud PUT para actualizar el proveedor
    fetch(`https://beautysalesbackend.onrender.com/api/proveedores/${objectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(proveedor)
    })
    .then(response => {
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Proveedor actualizado!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          // Redireccionar al usuario a la ruta /proveedores
          window.location.href = '/proveedores';
          // Realizar otras acciones necesarias en caso de éxito
        });
      } else {
        throw new Error("Error al actualizar proveedor");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar proveedor',
        text: 'Hubo un problema al actualizar el proveedor. Por favor, inténtalo de nuevo más tarde.',
        confirmButtonColor: '#3085d6',
      });
    });
  };

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-10 pt-4 text-texto-100">Editar proveedor</h1>
      <div className="flex justify-center">
        <div className="w-full md:flex flex-col md:w-[90%]">
          <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
            <div className="w-full">
              <label htmlFor="nombre" className="text-texto-100 mb-2 block">Nombre</label>
              <div className="relative">
              <FaUser className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
              <input
                type="text"
                placeholder="Nombre"
                name="nombre"
                value={proveedor.nombre}
                onChange={handleChange}
                className="text-black w-full px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
                rows={1}
                style={{ minHeight: "50px" }}
              />
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="telefono" className="text-texto-100 mb-2 block">Teléfono</label>
              <div className="relative">
              <FaPhone className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
              <input
                type="text"
                placeholder="Teléfono"
                className="text-black w-full px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
                name="telefono"
                value={proveedor.telefono}
                onChange={handleChange}
              />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
            <div className="w-full">
              <label htmlFor="correo" className="text-texto-100 mb-2 block">Correo electrónico</label>
              <div className="relative">
              <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
              <input
                type="email"
                placeholder="Correo electrónico"
                className="text-black w-full px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
                name="correo"
                value={proveedor.correo}
                onChange={handleChange}
              />
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="direccion" className="text-texto-100 mb-2 block">Dirección</label>
              <div className="relative">
              < FaMapMarkerAlt className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
              <input
                type="text"
                placeholder="Dirección"
                className="text-black w-full px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900"
                name="direccion"
                value={proveedor.direccion}
                onChange={handleChange}
              />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
            <div className="w-full">
              <label htmlFor="descripcion" className="text-texto-100 mb-2 block">Descripción</label>
              <div className="relative">
              <FaInfoCircle className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
              <textarea
                placeholder="Descripción"
                className="text-black w-full px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 bg-secondary-900 resize-none"
                name="descripcion"
                value={proveedor.descripcion}
                onChange={handleChange}
                rows={1}
              />
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="estado" className="text-texto-100 mb-2 block">Estado</label>
              <select
                name="estado"
                value={proveedor.estado}
                onChange={handleChange}
                className="text-black px-4 py-3 rounded-lg bg-secondary-900 w-full"

              >
                <option value={true}>Activo</option>
                <option value={false}>Inactivo</option>
              </select>
            </div>
          </div>
          <div className="w-full flex flex-col-reverse md:flex-row justify-center gap-12 mb-10">
          <Link to="/proveedores" className="w-full md:w-[35%]">
              <button className="w-full px-3 py-3 rounded-lg bg-gray-600 text-white hover:bg-opacity-[80%] transition-colors font-bold">
                Volver
              </button>
            </Link>
            <button
              className="w-full md:w-[35%] px-3 py-3 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold"
              onClick={handleActualizarProveedor}
            >
              Actualizar proveedor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProveedor;
