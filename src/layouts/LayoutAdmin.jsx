import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const LayoutAdmin = () => {
  const location = useLocation();

  let title = "";
  switch (location.pathname) {
    case "/perfil":
      title = "Perfil";
      break;
    case "/":
      title = "Dashboard";
      break;
    case "/ventas":
      title = "Ventas";
      break;
    case "/ventas/registrar-venta":
      title = "Registrar venta";
      break;
    case "/ventas/editar-venta":
      title = "Editar venta";
      break;
    case "/compras":
      title = "Compras";
      break;
    case "/compras/registrar-compra":
      title = "Registrar compra";
      break;
    case "/compras/editar-compra":
      title = "Editar compra";
      break;
    case "/proveedores":
      title = "Proveedores";
      break;
    case "/proveedores/registrar-proveedor":
      title= "Registrar Proveedor";
      break
    case "/proveedores/editar-proveedor":
      title= "Editar Proveedor";
      break
    case "/productos":
      title= "Productos";
      break
    case "/productos/registrar-producto":
      title= " Registrar Producto";
      break
    case "/productos/editar-producto":
      title= " Editar Producto";
      break
    case "/categorias":
      title= "Categorias";
      break
    case "/categorias/registrar-categoria":
      title= "Registrar Categorias";
      break 
    case "/categorias/editar-categoria":
      title= "Editar Categorias";
      break 
    case "/clientes":
      title= "Clientes";
      break
    case "/clientes/registrar-cliente":
      title= " Registrar Clientes";
      break 
    case "/clientes/editar-cliente":
      title= " Editar Clientes";
      break  
    case "/usuarios":
      title = "Usuarios";
      break;
    case "/usuarios/registrar-usuario":
      title = "Registrar usuario";
      break;
    case "/usuarios/editar-usuario":
      title = "Editar usuario";
      break;
      case "/roles":
      title = "roles";
      break;
    case "/roles/registrar-rol":
      title = "Registrar rol";
      break;
    case "/roles/editar-rol":
      title = "Editar rol";
      break;
    default:
      title = "";
  }

  return (
    <div className="min-h-screen grid grid-cols-1 xl:grid-cols-6">
      <Sidebar />
      <div className="xl:col-span-5">
        <Header title={title} />
        <div className="h-[90vh] overflow-y-scroll p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
