import React, { useState, useEffect } from 'react';
import { FaSearch, FaTrashAlt, FaSave, FaTimesCircle, FaPlus } from "react-icons/fa";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import Swal from 'sweetalert2';

const RegistrarVenta = () => {
  
  const [clientes, setClientes] = useState([]);
  const [productosEncontrados, setProductosEncontrados] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState('');
  const [numeroVenta, setNumeroVenta] = useState('');
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
          setClientes(data.clientes);
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
    const total = productosEncontrados.reduce((acc, producto) => acc + producto.total, 0);

    const venta = {
      numeroVenta: numeroVenta,
      fecha: fecha,
      idCliente: clienteSeleccionado,
      detallesVenta: productosEncontrados,
      total: total, 
      descripcionEstado: "Porqué cambias de estado?" 
    };

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
        <h3 className="text-2xl font-bold text-white">Registrar venta</h3>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Número de venta"
            className="border border-gray-300 rounded-md w-32 px-3 py-2 mt-1 mb-2 bg-gray-200 text-black mr-2"
            value={numeroVenta}
            onChange={(e) => setNumeroVenta(e.target.value)}
          />
          <input
            type="date"
            className="border border-gray-300 rounded-md w-32 px-3 py-2 mt-1 mb-2 bg-gray-200 text-black mr-2"
            value={fecha}
            readOnly
          />
          <select
            value={clienteSeleccionado}
            onChange={(e) => setClienteSeleccionado(e.target.value)}
            className="px-4 py-1 text-black text-sm rounded-full bg-gray-300 border border-white mr-2"
            style={{ fontSize: '12px', width: '140px' }}
          >
            <option value="">Seleccione cliente</option>
            {clientes.map(cliente => (
              <option key={cliente._id} value={cliente._id}>{cliente.nombre}</option>
            ))}
          </select>
          <button onClick={handleShowModal} className="px-3 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 focus:outline-none">
            <FaPlus />
          </button>
        </div>
      </div>
      <div className="flex justify-center p-8">
        <div className="w-full">
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Buscar Producto</label>
            <div className="flex items-center border-b border-b-2 border-gray-200 py-2">
              <input
                type="text"
                placeholder="Buscar producto"
                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                value={inputValue}
                onChange={buscarProducto}
              />
              <FaSearch className="text-white" />
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
            <label className="block text-white text-sm font-bold mb-2">Productos Agregados</label>
            <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
              {productosEncontrados.map((producto, index) => (
                <li key={index} className="px-4 py-4 flex items-center justify-between text-sm">
                  <div>
                    <div className="flex items-center">
                      <button
                        className="bg-green-500 text-white rounded-md p-1 text-xs hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        onClick={() => {
                          const newCantidad = Math.max(producto.cantidad - 1, 0);
                          agregarProducto(producto.nombre, newCantidad);
                        }}
                        type="button"
                      >
                        <CiCircleMinus />
                      </button>
                      <input
                        type="number"
                        className="bg-gray-200 border border-gray-300 rounded-md w-16 px-3 py-1 text-black ml-2"
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
                        className="bg-green-500 text-white rounded-md p-1 text-xs hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        onClick={() => {
                          const newCantidad = producto.cantidad + 1;
                          agregarProducto(producto.nombre, newCantidad);
                        }}
                        type="button"
                      >
                        <CiCirclePlus />
                      </button>
                    </div>
                    <span className="text-white font-medium">{producto.nombre}</span>
                    <div>
                      <span className="text-white mr-2">Precio Unitario: ${producto.precio}</span>
                      <span className="text-white">Subtotal: ${producto.total}</span>
                    </div>
                  </div>
                  <FaTrashAlt className="text-[#FF0000] cursor-pointer" onClick={() => eliminarProducto(producto)} />
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end gap-4">
            <p className="text-white font-bold">Total: ${totalVenta}</p>
            <button onClick={guardarVentaApi} className="px-6 py-2 mt-10 bg-green-500 rounded-full text-white"><FaSave /></button>
            <button onClick={cancelarVenta} className="px-6 py-2 mt-10 bg-red-500 rounded-full text-white"><FaTimesCircle /></button>
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
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Nuevo Cliente
                    </h3>
                    <div className="mt-2">
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
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={handleSubmit} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Guardar
                </button>
                <button onClick={handleCloseModal} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm">
                  Cancelar
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
