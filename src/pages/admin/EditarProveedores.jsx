import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBox, FaInfoCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const EditarProveedor = () => {
  const [proveedores, setProveedores] = useState([]);
  const [proveedorFiltrado, setProveedorFiltrado] = useState({
    _id: "",
    nombre: "",
    telefono: "",
    correo: "",
    direccion: "",
    descripcion: "",
    estado: false
  });
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const obtenerProveedor = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/proveedores');
        if (response.ok) {
          const data = await response.json();
          if (data && data.proveedores && data.proveedores.length > 0) {
            setProveedores(data.proveedores);
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

    obtenerProveedor();
  }, []);

  const handleBuscarProveedor = (e) => {
    const valorBusqueda = e.target.value.toLowerCase();
    setBusqueda(valorBusqueda);
    const proveedoresFiltrados = proveedores.filter(p =>
      p.nombre.toLowerCase().includes(valorBusqueda)
    );
    setProveedorFiltrado(proveedoresFiltrados.length > 0 ? proveedoresFiltrados[0] : {
      _id: "",
      nombre: "",
      telefono: "",
      correo: "",
      direccion: "",
      descripcion: "",
      estado: false
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProveedorFiltrado(prevProveedorFiltrado => ({
      ...prevProveedorFiltrado,
      [name]: name === 'estado' ? value === 'activo' : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/proveedores/${proveedorFiltrado._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          estado: proveedorFiltrado.estado
        })
      });
      if (response.ok) {
        Swal.fire("¡Estado del proveedor actualizado!", "", "success");
        setTimeout(() => {
          window.location.href = "/proveedores";
        }, 2000);
      } else {
        Swal.fire("Error", "Hubo un problema al actualizar el estado del proveedor", "error");
      }
    } catch (error) {
      console.error('Error al actualizar el estado del proveedor:', error);
      Swal.fire("Error", "Hubo un problema al actualizar el estado del proveedor", "error");
    }
  };
  

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-10 pt-4">Editar proveedor</h1>
      <div className="flex justify-center">
        <div className="w-full md:flex flex-col md:w-[60%]">
          <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
            <input
              type="text"
              placeholder="Buscar proveedor"
              value={busqueda}
              onChange={handleBuscarProveedor}
              className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
              <div className="relative">
                <FaBox className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="text"
                  placeholder="Nombre"
                  name="nombre"
                  value={proveedorFiltrado.nombre}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
                />
              </div>
              <div className="relative">
                <FaBox className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="text"
                  placeholder="Telefono"
                  name="telefono"
                  value={proveedorFiltrado.telefono}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
                />
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
              <div className="relative">
                <FaBox className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="text"
                  placeholder="Correo"
                  name="correo"
                  value={proveedorFiltrado.correo}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
                />
              </div>
              <div className="relative">
                <FaBox className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <input
                  type="text"
                  placeholder="Dirección"
                  name="direccion"
                  value={proveedorFiltrado.direccion}
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
                  value={proveedorFiltrado.descripcion}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
                />
              </div>
              <div className="relative">
                <FaInfoCircle className="absolute top-1/2 -translate-y-1/2 left-2 text-black" />
                <select
                  name="estado"
                  value={proveedorFiltrado.estado ? 'activo' : 'inactivo'}
                  onChange={handleChange}
                  className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12"
                >
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
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
