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
    case "/usuarios":
      title = "Usuarios";
      break;
    case "/usuarios/registrar-usuario":
      title = "Registrar usuario";
      break;
    case "/usuarios/editar-usuario":
      title = "Editar usuario";
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
