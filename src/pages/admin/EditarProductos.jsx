import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const EditarProducto = () => {
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    cantidad: "",
    descripcion: "",
    estado: false // Estado inicial como un booleano
  });

  const { objectId } = useParams();

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/productos/${objectId}`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos del producto');
        }
        const data = await response.json();
        setProducto(data.producto);
      } catch (error) {
        console.error("Error fetching producto:", error);
      }
    };
  
    fetchProducto();
  
  }, [objectId]);
  
  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    });
  };
  

  const handleActualizarProducto = () => {
    // Verificar que ningún campo esté vacío
    if (
      producto.nombre.trim() === "" ||
      producto.cantidad.trim() === "" ||
      producto.descripcion.trim() === "" ||
      producto.estado === ""
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    // Realizar la solicitud PUT para actualizar el producto
    fetch(`http://localhost:8080/api/productos/${objectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(producto)
    })
    .then(response => {
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Producto actualizado!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          // Redireccionar al usuario a la ruta /productos
          window.location.href = '/productos';
          // Realizar otras acciones necesarias en caso de éxito
        });
      } else {
        throw new Error("Error al actualizar producto");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar producto',
        text: 'Hubo un problema al actualizar el producto. Por favor, inténtalo de nuevo más tarde.',
        confirmButtonColor: '#3085d6',
      });
    });
  };

  return (
    <div className="bg-secondary-100 py-4 px-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-10 pt-4">Editar producto</h1>
      <div className="flex justify-center">
        <div className="w-full md:flex flex-col md:w-[60%]">
          <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
            <input
              type="text"
              placeholder="Nombre del producto"
              className="text-black px-4 py-3 rounded-lg"
              name="nombre"
              value={producto.nombre}
              onChange={handleChange}
            />
            { /* Añadir capa para ocultar el precio */ }
            <div className="relative">
              <input
                type="text"
                placeholder="Precio"
                className="text-black px-4 py-3 rounded-lg"
                name="precio"
                value={producto.precio}
                onChange={handleChange}
              />
              <div className="absolute top-0 left-0 h-full w-full bg-white opacity-70"></div>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
            <input
              type="text"
              placeholder="Cantidad"
              className="text-black px-4 py-3 rounded-lg"
              name="cantidad"
              value={producto.cantidad}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Descripción"
              className="text-black px-4 py-3 rounded-lg"
              name="descripcion"
              value={producto.descripcion}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
            <select
              name="estado"
              value={producto.estado}
              onChange={handleChange}
              className="text-black px-4 py-3 rounded-lg"
            >
              <option value={true}>Activo</option>
              <option value={false}>Inactivo</option>
            </select>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
            <button
              className="w-full md:w-[43%] px-3 py-3 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold"
              onClick={handleActualizarProducto}
            >
              Actualizar producto
            </button>
            <Link to="/productos" className="w-full md:w-[43%]">
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

export default EditarProducto;
