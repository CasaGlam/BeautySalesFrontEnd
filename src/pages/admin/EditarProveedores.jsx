import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

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

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/proveedores/${objectId}`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos del usuario');
        }
        const data = await response.json();
        setProveedor(data.proveedor);
      } catch (error) {
        console.error("Error fetching proveedor:", error);
      }
    };

    fetchProveedores();

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

    // Realizar la solicitud PUT para actualizar el proveedor
    fetch(`http://localhost:8080/api/proveedores/${objectId}`, {
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
  <h1 className="text-2xl font-bold mb-10 pt-4">Editar proveedor</h1>
  <div className="flex justify-center">
    <div className="w-full md:flex flex-col md:w-[60%]">
      <div className="flex flex-col md:flex-row mb-6">
        <div className="flex flex-col md:w-1/2 mr-2">
          <label htmlFor="nombre" className="text-white mb-2">Nombre del proveedor</label>
          <input
            type="text"
            placeholder="Nombre del proveedor"
            className="text-black px-4 py-3 rounded-lg"
            name="nombre"
            value={proveedor.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col md:w-1/2 ml-2">
          <label htmlFor="telefono" className="text-white mb-2">Teléfono</label>
          <input
            type="text"
            placeholder="Teléfono"
            className="text-black px-4 py-3 rounded-lg"
            name="telefono"
            value={proveedor.telefono}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row mb-6">
        <div className="flex flex-col md:w-1/2 mr-2">
          <label htmlFor="correo" className="text-white mb-2">Correo electrónico</label>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="text-black px-4 py-3 rounded-lg"
            name="correo"
            value={proveedor.correo}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col md:w-1/2 ml-2">
          <label htmlFor="direccion" className="text-white mb-2">Dirección</label>
          <input
            type="text"
            placeholder="Dirección"
            className="text-black px-4 py-3 rounded-lg"
            name="direccion"
            value={proveedor.direccion}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row mb-6">
        <div className="flex flex-col md:w-1/2 mr-2">
          <label htmlFor="descripcion" className="text-white mb-2">Descripción</label>
          <input
            type="text"
            placeholder="Descripción"
            className="text-black px-4 py-3 rounded-lg"
            name="descripcion"
            value={proveedor.descripcion}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col md:w-1/2 ml-2">
          <label htmlFor="estado" className="text-white mb-2">Estado</label>
          <select
            name="estado"
            value={proveedor.estado}
            onChange={handleChange}
            className="text-black px-4 py-3 rounded-lg"
            style={{ width: "100%" }}
          >
            <option value={true}>Activo</option>
            <option value={false}>Inactivo</option>
          </select>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
        <button
          className="w-full md:w-[50%] px-3 py-3 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold"
          onClick={handleActualizarProveedor}
        >
          Actualizar proveedor
        </button>
        <Link to="/proveedores" className="w-full md:w-[50%]">
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

export default EditarProveedor;
