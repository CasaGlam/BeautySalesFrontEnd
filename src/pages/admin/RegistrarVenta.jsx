import React, { useState, useEffect } from 'react';
import { FaSearch, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import Swal from 'sweetalert2';

const RegistrarVenta = () => {

  const [clientes, setClientes] = useState([]);
  const [productosEncontrados, setProductosEncontrados] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState('');
  const [fecha, setFecha] = useState('');
  const [totalVenta, setTotalVenta] = useState(0); 
  const [showModal, setShowModal] = useState(false); 
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    estado: true, 
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/clientes')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.clientes)) {
          const clientesActivos = data.clientes.filter(cliente => cliente.estado === true);
          setClientes(clientesActivos);
        } else {
          console.error('La respuesta de la API de clientes no es un array:', data);
        }
      })
      .catch(error => console.error('Error al obtener clientes:', error));
  }, []);
  

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoCliente(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    fetch('http://localhost:8080/api/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoCliente)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error al guardar el cliente');
      })
      .then(data => {
        console.log('Cliente guardado correctamente:', data);
        Swal.fire(
          'Cliente Guardado',
          'El cliente ha sido guardado correctamente.',
          'success'
        ).then(() => {
          setClientes([...clientes, data.cliente]);
          setShowModal(false);
          setNuevoCliente({
            nombre: '',
            telefono: '',
            correo: '',
            estado: true,
          });
        });
      })
      .catch(error => {
        console.error('Error al guardar el cliente:', error);
        Swal.fire(
          'Error',
          'Hubo un problema al guardar el cliente.',
          'error'
        );
      });
  };

  const buscarProducto = (e) => {
    const value = e.target.value;
    setInputValue(value);

    fetch('http://localhost:8080/api/productos')
      .then(response => response.json())
      .then(data => {
        const productos = data.productos.map(producto => producto.nombre);
        const filteredSuggestions = productos.filter(
          producto =>
            producto.toLowerCase().indexOf(value.toLowerCase()) > -1
        );
        setSuggestions(filteredSuggestions);
      })
      .catch(error => console.error('Error al obtener productos:', error));
  };

  const agregarProducto = (producto, cantidad) => {
    const productoExistente = productosEncontrados.find(item => item.nombre === producto);

    if (productoExistente) {
      const nuevosProductos = productosEncontrados.map(item =>
        item.nombre === producto ? { ...item, cantidad: cantidad, total: cantidad * item.precio } : item
      );
      setProductosEncontrados(nuevosProductos);
    } else {
      fetch('http://localhost:8080/api/productos')
        .then(response => response.json())
        .then(data => {
          const productoEncontrado = data.productos.find(item => item.nombre === producto);
          if (productoEncontrado) {
            setProductosEncontrados([...productosEncontrados, {
              nombre: producto,
              cantidad: cantidad,
              precio: productoEncontrado.precio,
              total: cantidad * productoEncontrado.precio, 
              idProducto: productoEncontrado._id 
            }]);
          } else {
            console.error('Producto no encontrado:', producto);
          }
        })
        .catch(error => console.error('Error al obtener producto:', error));
    }

    setInputValue('');
    setSuggestions([]);
  };

  const eliminarProducto = (producto) => {
    const nuevosProductos = productosEncontrados.filter(item => item.nombre !== producto.nombre);
    setProductosEncontrados(nuevosProductos);
  };
  const guardarVentaApi = () => {
    if ( !clienteSeleccionado) {
      Swal.fire(
        'Campos incompletos',
        ' debe seleccionar un cliente.',
        'warning'
      );
      return;
    }
  
    if (productosEncontrados.length === 0) {
      Swal.fire(
        'Sin productos',
        'Debe agregar al menos un producto a la venta.',
        'warning'
      );
      return;
    }
  
    // Verificar disponibilidad de stock
    const verificarStock = async () => {
      try {
        for (let producto of productosEncontrados) {
          const response = await fetch(`http://localhost:8080/api/productos/${producto.idProducto}`);
          if (!response.ok) {
            throw new Error('Error al obtener el producto');
          }
          const data = await response.json();
          const stockDisponible = data.producto.cantidad;
  
          if (producto.cantidad > stockDisponible) {
            // Mostrar alerta de falta de stock
            Swal.fire(
              'No hay stock disponible',
              `No hay suficiente stock para el producto: ${producto.nombre}`,
              'error'
            );
            return false; // Terminar la función ya que no hay stock suficiente
          }
        }
        return true; // Si hay suficiente stock para todos los productos
      } catch (error) {
        console.error('Error al verificar stock:', error);
        Swal.fire(
          'Error',
          'Hubo un problema al verificar el stock.',
          'error'
        );
        return false;
      }
    };
  
    // Llamar a la función para verificar el stock
    verificarStock().then(stockSuficiente => {
      if (stockSuficiente) {
        const total = productosEncontrados.reduce((acc, producto) => acc + producto.total, 0);
  
        const venta = {
          
          fecha: new Date().toISOString().slice(0, 10),
          idCliente: clienteSeleccionado,
          detallesVenta: productosEncontrados,
          total: total,
          descripcionEstado: "Porqué cambias de estado?"
        };
  
        Swal.fire({
          title: '¿Está seguro de realizar la venta?',
          text: `El total de la venta será: $${total}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, realizar venta',
          cancelButtonText: 'No, cancelar',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            // Aquí realizar la solicitud para guardar la venta
            fetch('http://localhost:8080/api/ventas', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(venta)
            })
              .then(response => {
                if (response.ok) {
                  return response.json();
                }
                throw new Error('Error al guardar la venta');
              })
              .then(data => {
                console.log('Venta guardada correctamente:', data);
  
                // Actualizar la cantidad vendida de cada producto en el stock
                for (let producto of productosEncontrados) {
                  fetch(`http://localhost:8080/api/productos/${producto.idProducto}`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ cantidadVendida: producto.cantidad })
                  })
                    .then(response => {
                      if (!response.ok) {
                        throw new Error('Error al actualizar la cantidad de productos');
                      }
                    })
                    .catch(error => console.error('Error al actualizar la cantidad de productos:', error));
                }
  
                Swal.fire(
                  'Venta Guardada',
                  'La venta ha sido guardada correctamente.',
                  'success'
                ).then(() => {
                  setProductosEncontrados([]);
                  setTotalVenta(0);
                });
              })
              .catch(error => {
                console.error('Error al guardar la venta:', error);
                Swal.fire(
                  'Error',
                  'Hubo un problema al guardar la venta.',
                  'error'
                );
              });
          }
        });
      }
    });
  };
  

  const cancelarVenta = () => {
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
        setProductosEncontrados([]);
        setTotalVenta(0); 
        Swal.fire(
          'Creación de cliente cancelada',
          'La creación de cliente ha sido cancelada.',
          'error'
        );
      }
    });
  };

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    setFecha(formattedDate);
  }, []);

  useEffect(() => {
    const total = productosEncontrados.reduce((acc, producto) => acc + producto.total, 0);
    setTotalVenta(total);
  }, [productosEncontrados]);

  return (
    <div className="bg-secondary-100 w-full rounded-lg">
      <div className="flex justify-between p-4">
        <div className="flex items-center w-full">
          <div className='flex justify-between w-full'>
          <div className=''>
          <input
            type="date"
            className="border border-gray-300 rounded-md w-32 pl-3 py-[7px] mt-1 mb-2 bg-gray-200 text-texto-100 mr-2"
            value={fecha}
            readOnly
          />
         
          </div>
          <div>
          <select
  value={clienteSeleccionado}
  onChange={(e) => setClienteSeleccionado(e.target.value)}
  className="border border-gray-300 rounded-md w-32 px-3 py-2 mt-1 mb-2 bg-gray-200 text-texto-100 mr-2"
>
  <option value="" className=''>Cliente</option>
  {clientes.map(cliente => (
    <option key={cliente._id} value={cliente._id}>{cliente.nombre}</option>
  ))}
</select>

          <button onClick={handleShowModal} className="px-3 py-2 bg-gray-800 text-texto-900 rounded-full hover:bg-gray-700 focus:outline-none">
            <FaPlus />
          </button>
          </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center p-8">
        <div className="w-full">
          <div className="mb-4">
            <label className="block text-texto-100 text-sm font-bold mb-2">Buscar Producto</label>
            <div className="flex items-center border-b-2 border-gray-200 py-2">
              <input
                type="text"
                placeholder="Buscar producto"
                className="appearance-none bg-transparent border-none w-full text-texto-100 mr-3 py-1 px-2 leading-tight focus:outline-none"
                value={inputValue}
                onChange={buscarProducto}
              />
              <FaSearch className="text-texto-100" />
            </div>
            {suggestions.length > 0 && (
              <ul className="suggestions bg-gray-300 text-black absolute mt-1 border border-gray-400 rounded-md py-2 w-[400px] overflow-x-auto" style={{ maxHeight: '200px' }}>
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="p-3 hover:bg-gray-400 cursor-pointer" onClick={() => agregarProducto(suggestion, 1)}>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-texto-100 text-sm font-bold mb-2">Productos Agregados</label>
            <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
              {productosEncontrados.map((producto, index) => (
                <li key={index} className="px-4 py-4 flex items-center justify-between text-sm">
                  <div>
                    <div className="flex items-center">
                      <button
                        className="bg-primary text-texto-100 rounded-md p-1 text-xs  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        onClick={() => {
                          const newCantidad = Math.max(producto.cantidad - 1, 0);
                          agregarProducto(producto.nombre, newCantidad);
                        }}
                        type="button"
                      >
                        <FaMinus className='text-texto-900'/>
                      </button>
                      <input
                        type="number"
                        className="bg-gray-200 border border-gray-300 rounded-md w-16 px-3 py-1 text-black mx-2"
                        value={producto.cantidad}
                        onChange={(e) => {
                          const newCantidad = parseInt(e.target.value);
                          setProductosEncontrados(prevProductos => prevProductos.map((p, i) => {
                            if (i === index) {
                              return { ...p, cantidad: newCantidad };
                            }
                            return p;
                          }));
                        }}
                      />
                      <button
                        className="bg-primary text-texto-100 rounded-md p-1 text-xs  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        onClick={() => {
                          const newCantidad = producto.cantidad + 1;
                          agregarProducto(producto.nombre, newCantidad);
                        }}
                        type="button"
                      >
                        <FaPlus className='text-texto-900'/>
                      </button>
                    </div>
                    <span className="text-texto-100 font-medium">{producto.nombre}</span>
                    <div>
                      <span className="text-texto-100 mr-2">Precio Unitario: ${producto.precio}</span>
                      <span className="text-texto-100">Subtotal: ${producto.total}</span>
                    </div>
                  </div>
                  <FaTrash className="text-[#FF0000] cursor-pointer" onClick={() => eliminarProducto(producto)} />
               
                  </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <div className='flex justify-end mr-14'>
            <p className="text-texto-100 font-bold">Total: ${totalVenta}</p>
            </div>
              <div className='flex flex-col md:flex-row justify-center gap-12 mb-10'>
              <button onClick={cancelarVenta} className="md:w-[43%] w-full px-3 py-3 rounded-lg bg-gray-600 text-white hover:bg-opacity-[80%] transition-colors font-bold">Cancelar</button>
            <button onClick={guardarVentaApi} className="w-full md:w-[43%] px-3 py-3 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold">Guardar</button>

              </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Nuevo Cliente
                    </h3>
                    <div className="mt-2 w-full">
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                          Nombre
                        </label>
                        <input
                          type="text"
                          name="nombre"
                          id="nombre"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Nombre"
                          value={nuevoCliente.nombre}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                          Teléfono
                        </label>
                        <input
                          type="text"
                          name="telefono"
                          id="telefono"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Teléfono"
                          value={nuevoCliente.telefono}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="correo">
                          Correo Electrónico
                        </label>
                        <input
                          type="email"
                          name="correo"
                          id="correo"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Correo Electrónico"
                          value={nuevoCliente.correo}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-center gap-8 mb-10">
                
                <button onClick={handleCloseModal} type="button" className="md:w-[43%] w-full px-2 py-2 rounded-lg bg-gray-600 text-white hover:bg-opacity-[80%] transition-colors font-bold">
                  Cancelar
                </button>
                <button onClick={handleSubmit} type="button" className="w-full md:w-[43%] px-2 py-2 rounded-lg bg-primary text-white hover:bg-opacity-[80%] transition-colors font-bold">
                  Guardar
                </button> 
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrarVenta;
