import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const EditarProducto = () => {
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    estado: false // Estado inicial como un booleano
  });
  const [categorias, setCategorias] = useState([]);
  const { objectId } = useParams();

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const responseProducto = await fetch(`http://localhost:8080/api/productos/${objectId}`);
        const responseCategorias = await fetch(`http://localhost:8080/api/categorias`);
        
        if (!responseProducto.ok || !responseCategorias.ok) {
          throw new Error('Error al obtener los datos');
        }
        
        const dataProducto = await responseProducto.json();
        const dataCategorias = await responseCategorias.json();
        
        setProducto(dataProducto.producto);
        setCategorias(dataCategorias.categorias);
      } catch (error) {
        console.error("Error fetching data:", error);
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
      producto.descripcion.trim() === "" ||
      producto.idCategoria.trim() === "" ||
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
      <h1 className="text-2xl font-bold mb-10 pt-4 text-texto-100">Editar producto</h1>
      <div className="flex justify-center">
        <div className="w-full md:flex flex-col md:w-[90%]">
          <div className="w-full flex flex-col md:flex-row gap-12 mb-10">
            <div className="w-full">
              <label htmlFor="nombre" className="text-texto-100 mb-2 block">Nombre del producto</label>
              <input
                type="text"
                placeholder="Nombre del producto"
                className="text-black px-4 py-3 rounded-lg bg-secondary-900 md:w-[101%]"
                name="nombre"
                value={producto.nombre}
                onChange={handleChange}
              />
            </div>
            
            <div className="w-full">
              <label htmlFor="idCategoria" className="text-texto-100 mb-2 block">Categoría</label>
              <select
                name="idCategoria"
                value={producto.idCategoria}
                onChange={handleChange}
                className="text-black px-4 py-3 rounded-lg bg-secondary-900 md:w-[101%]"
              >
                <option value="">Seleccionar categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria._id} value={categoria._id}>{categoria.nombre}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row gap-12 mb-10">
          <div className="w-full">
              <label htmlFor="descripcion" className="text-texto-100 mb-2 block">Descripción</label>
              <textarea
                placeholder="Descripción"
                name="descripcion"
                value={producto.descripcion}
                onChange={handleChange}
                className="text-black px-2 py-3 rounded-lg pl-8 pr-8 md:pl-8 md:pr-12 md:w-[101%] resize-none bg-secondary-900"
                rows={1}
                style={{ minHeight: "10px" }}
              />
            </div>
            <div className="w-full">
              <label htmlFor="estado" className="text-texto-100 mb-2 block">Estado</label>
              <select
                name="estado"
                value={producto.estado}
                onChange={handleChange}
                className="text-black px-4 py-3 rounded-lg bg-secondary-900 md:w-[101%]"
              >
                <option value={true}>Activo</option>
                <option value={false}>Inactivo</option>
              </select>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-center gap-12 mb-10">
          <Link to="/productos" className="w-full md:w-[35%]">
              <button className="w-full px-3 py-3 rounded-lg bg-gray-600 text-white hover:bg-opacity-[80%] transition-colors font-bold">
                Volver
              </button>
            </Link>
            <button
              className="w-full md:w-[35%] px-3 py-3 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold"
              onClick={handleActualizarProducto}
            >
              Actualizar producto
            </button>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
