import React from 'react'
import { Link } from "react-router-dom";


const Ventas = () => {
  return (
    <div >
      <Link to="/ventas/registrar-venta">
        <button className='border p-5'>Registrar venta</button>
      </Link>
      <Link to="/ventas/editar-venta">
        <button className='border p-5'>Editar venta</button>
      </Link>
    </div>
  )
}

export default Ventas