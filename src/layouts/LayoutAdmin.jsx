import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const LayoutAdmin = () => {
  const location = useLocation();

  let title = "";
  switch (location.pathname) {
    case "/":
      title = "Dashboard";
      break;
    case "/perfil":
      title = "Perfil";
      break;
    case "/ventas/registrar":
      title = "Registro";
      break;
    case "/proveedores":
      title = "Proveedores";
      break;
    case "/compras":
      title = "Compras";
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
