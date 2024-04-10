import React, { useState, useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const Compras = () => {
  const [numeroCompra, setNumeroCompra] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [totalCompra, setTotalCompra] = useState(0);
  const [proveedor, setProveedor] = useState('');
  const [proveedorId, setProveedorId] = useState('');
  const [busquedaProducto, setBusquedaProducto] = useState('');
  const [productos, setProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/productos')
      .then(response => response.json())
      .then(data => {
        setProductos(data.productos);
      })
      .catch(error => console.error('Error fetching productos:', error));

    fetch('http://localhost:8080/api/proveedores')
      .then(response => response.json())
      .then(data => {
        setProveedores(data.proveedores);
        setProveedor(data.proveedores[0].nombre);
        setProveedorId(data.proveedores[0]._id);
      })
      .catch(error => console.error('Error fetching proveedores:', error));
  }, []);

  const agregarProducto = (productoId, cantidad = 1) => {
    const producto = productos.find(item => item._id === productoId);
    if (!producto) return;

    const productoExistente = productosSeleccionados.find(item => item._id === productoId);

    if (productoExistente) {
      const nuevosProductos = productosSeleccionados.map(item =>
        item._id === productoId ? { ...item, cantidad } : item
      );
      setProductosSeleccionados(nuevosProductos);
      calcularTotalCompra(nuevosProductos);
    } else {
      setProductosSeleccionados([...productosSeleccionados, {
        ...producto,
        cantidad,
        idProducto: producto._id, // Agregar el ID del producto
        precioCompra: 0, // Inicializar el precio de compra
        precioVenta: producto.precioVenta, // Inicializar el precio de venta
        precio: producto.precio // Obtener precio del producto
      }]);
      calcularTotalCompra([...productosSeleccionados, { ...producto, cantidad }]);
    }
  };

  const restarCantidad = (productoId) => {
    const producto = productosSeleccionados.find(item => item._id === productoId);
    if (!producto) return;

    const nuevosProductos = productosSeleccionados.map(item =>
      item._id === productoId ? { ...item, cantidad: Math.max(item.cantidad - 1, 0) } : item
    );
    setProductosSeleccionados(nuevosProductos);
    calcularTotalCompra(nuevosProductos);
  };

  const eliminarProductoSeleccionado = (productoId) => {
    const producto = productosSeleccionados.find(item => item._id === productoId);
    if (!producto) return;

    const nuevosProductos = productosSeleccionados.filter(item => item._id !== productoId);
    setProductosSeleccionados(nuevosProductos);
    calcularTotalCompra(nuevosProductos);
  };

  const calcularTotalCompra = (productosSeleccionados) => {
    let total = 0;
    productosSeleccionados.forEach(producto => {
      total += producto.precio * producto.cantidad;
    });
    setTotalCompra(total);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!numeroCompra || !descripcion || !fecha || !proveedorId || productosSeleccionados.length === 0) {
      Swal.fire(
        'Campos incompletos',
        'Por favor, complete todos los campos obligatorios.',
        'error'
      );
      return;
    }
    Swal.fire({
      title: '¿Desea confirmar la compra?',
      text: 'Una vez confirmada, la compra será procesada.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        const detallesCompra = productosSeleccionados.map(producto => ({
          precio: producto.precio,
          cantidad: producto.cantidad,
          precioCompra: producto.precioCompra,
          total: producto.precio * producto.cantidad,
          idProducto: producto.idProducto, // Usar el ID del producto seleccionado
          precioVenta: producto.precioVenta // Incluir el precio de venta
        }));

        const compra = {
          numeroCompra,
          descripcion,
          fecha,
          estado: true,
          total: totalCompra,
          idProveedor: proveedorId,
          detallesCompra
        };

        try {
          const response = await fetch('http://localhost:8080/api/compras', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(compra)
          });

          if (response.ok) {
            Swal.fire(
              'Compra realizada',
              'La compra ha sido realizada correctamente.',
              'success'
            ).then(() => {
              window.location.href = "/compras";
            });
          } else {
            throw new Error('Error al realizar la compra');
          }
        } catch (error) {
          console.error('Error:', error);
          Swal.fire(
            'Error',
            'Hubo un problema al procesar la compra. Por favor, intenta de nuevo más tarde.',
            'error'
          );
        }
      }
    });
  };

  const handleCancel = () => {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Si cancela, se perderán los datos ingresados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, volver',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Compra cancelada',
          'La compra ha sido cancelada.',
          'error'
        ).then(() => {
          window.location.href = "/compras";
        });
      }
    });
  };

  const currentDate = new Date().toISOString().split('T')[0];

  const actualizarPrecioVentaProducto = async (productoId, nuevoPrecioVenta) => {
    try {
      const response = await fetch(`http://localhost:8080/api/productos/${productoId}`, {
        method: 'PUT', // Utilizar el método PUT para actualizar el precio de venta
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ precio: nuevoPrecioVenta })
      });

      if (response.ok) {
        // Actualizar el estado local del producto con el nuevo precio de venta
        const nuevosProductos = productos.map(item =>
          item._id === productoId ? { ...item, precioVenta: nuevoPrecioVenta } : item
        );
        setProductos(nuevosProductos);
      } else {
        throw new Error('Error al actualizar el precio de venta del producto');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error al actualizar el precio de venta del producto');
    }
  };

  const productosFiltrados = useMemo(() =>
    productos.filter(producto =>
      producto.nombre.toLowerCase().includes(busquedaProducto.toLowerCase())
    ), [productos, busquedaProducto]);

  return (
    <div className="bg-secondary-100 w-full rounded-lg">
      <div className="flex justify-center p-8">
        <div className='w-full'>
          <h3 className="text-2xl font-bold mb-4 text-white">Registrar compra</h3>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Productos Seleccionados</label>
            <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
              {productosSeleccionados.map((producto, index) => (
                <li key={index} className="px-4 py-4 flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <button
                      className="bg-green-500 text-white rounded-md p-1 text-xs hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      onClick={() => restarCantidad(producto._id)}
                      type="button"
                    >
                      <FaMinus />
                    </button>
                    <input
                      type="number"
                      className="bg-gray-200 border border-gray-300 rounded-md w-16 px-2 py-1 text-black ml-2"
                      value={producto.cantidad}
                      onChange={(e) => {
                        const newCantidad = parseInt(e.target.value);
                        agregarProducto(producto._id, newCantidad);
                      }}
                    />
                    <button
                      className="bg-green-500 text-white rounded-md p-1 text-xs hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      onClick={() => {
                        const newCantidad = producto.cantidad + 1;
                        agregarProducto(producto._id, newCantidad);
                      }}
                      type="button"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <span className="font-medium truncate">{producto.nombre}</span>
                  <span className="font-medium truncate">{producto.precio}</span>
                  <FaTrash
                    className="cursor-pointer text-red-500 hover:text-red-700"
                    onClick={() => eliminarProductoSeleccionado(producto._id)}
                  />
                  <div>
                    <label className="block text-white text-sm font-bold mb-2" htmlFor={`precioCompra_${index}`}>Precio de Compra</label>
                    <input
                      id={`precioCompra_${index}`}
                      type="number"
                      className="bg-gray-200 border border-gray-300 rounded-md w-16 px-2 py-1 text-black ml-2"
                      value={producto.precioCompra}
                      onChange={(e) => {
                        const newPrecioCompra = parseFloat(e.target.value);
                        const nuevosProductos = productosSeleccionados.map(item =>
                          item._id === producto._id ? { ...item, precioCompra: newPrecioCompra } : item
                        );
                        setProductosSeleccionados(nuevosProductos);
                        calcularTotalCompra(nuevosProductos);
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-bold mb-2" htmlFor={`precioVenta_${index}`}>Precio de Venta</label>
                    <input
                      id={`precioVenta_${index}`}
                      type="text" // Cambiado a texto para permitir decimales
                      className="bg-gray-200 border border-gray-300 rounded-md w-16 px-2 py-1 text-black ml-2"
                      value={isNaN(producto.precioVenta) ? '' : producto.precioVenta}
                      onChange={(e) => {
                        const newPrecioVenta = parseFloat(e.target.value); // Cambiado a parseFloat
                        const nuevosProductos = productosSeleccionados.map(item =>
                          item._id === producto._id ? { ...item, precioVenta: newPrecioVenta } : item
                        );
                        setProductosSeleccionados(nuevosProductos);
                        calcularTotalCompra(nuevosProductos);
                        actualizarPrecioVentaProducto(producto._id, newPrecioVenta); // Actualizar precio de venta en el API
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4 ">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="buscarProducto">Buscar Producto</label>
            <div className="flex items-center border-b border-b-2 border-teal-500 py-2 gap-4">
              <input
                id="buscarProducto"
                className="appearance-none bg-transparent border rounded-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Buscar"
                value={busquedaProducto}
                onChange={(e) => setBusquedaProducto(e.target.value)}
              />
              <button
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                type="button"
                onClick={() => setBusquedaProducto('')}
              >
                Limpiar
              </button>
            </div>
          </div>
          {busquedaProducto && (
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">Productos</label>
              <div className="overflow-y-scroll max-h-40">
                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                  {productosFiltrados.map((producto, index) => (
                    <li key={index} className="px-4 py-4 flex items-center justify-between text-sm">
                      <span className="font-medium truncate">{producto.nombre}</span>
                      <button
                        className="bg-green-500 text-white rounded-md p-1 text-xs hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        onClick={() => agregarProducto(producto._id)}
                        type="button"
                      >
                        Agregar
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-white text-sm font-bold mb-2" htmlFor="numeroCompra">Número de Compra</label>
                <input
                  id="numeroCompra"
                  type="text"
                  className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Número de Compra"
                  value={numeroCompra}
                  onChange={(e) => setNumeroCompra(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-white text-sm font-bold mb-2" htmlFor="descripcion">Descripción</label>
                <input
                  id="descripcion"
                  type="text"
                  className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Descripción"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-white text-sm font-bold mb-2" htmlFor="fecha">Fecha</label>
                <input
                  id="fecha"
                  type="date"
                  min={currentDate} // Establecer la fecha mínima como la fecha actual
                  className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-white text-sm font-bold mb-2" htmlFor="proveedor">Proveedor</label>
                <select
                  id="proveedor"
                  className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={proveedorId}
                  onChange={(e) => {
                    const selectedProveedor = proveedores.find(proveedor => proveedor._id === e.target.value);
                    setProveedor(selectedProveedor.nombre);
                    setProveedorId(e.target.value);
                  }}
                >
                  {proveedores.map(proveedor => (
                    <option key={proveedor._id} value={proveedor._id}>{proveedor.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Confirmar Compra
                </button>
              </div>
              <div className="col-span-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Compras;

