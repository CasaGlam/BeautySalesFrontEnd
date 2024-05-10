import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { obtenerDatosDesdeToken } from "../functions/token";
import getPermisosDesdeToken from "../functions/PermisosDesdeToken";

const LayoutAdmin = () => {
  const location = useLocation();
  const [permisos, setPermisos] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar si se está cargando el contenido

  useEffect(() => {
    const tokenData = obtenerDatosDesdeToken();
    
    if (tokenData) {
      const { rol } = tokenData;

      const obtenerPermisos = async () => {
        try {
          const permisos = await getPermisosDesdeToken(rol);
          setPermisos(permisos);
          setIsLoading(false); // Indicar que la carga ha terminado
        } catch (error) {
          console.error("Error al obtener permisos desde el token:", error);
          setIsLoading(false); // Manejar error también termina la carga
        }
      };

      obtenerPermisos();
    }
  }, []);

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
      title= "Registrar Clientes";
      break 
    case "/clientes/editar-cliente":
      title= "Editar Clientes";
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
      title = "Roles";
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
      {isLoading ? (
        <div className="flex justify-center items-center h-[100vh] w-[100vw]">
        <div className="loader w-full flex justify-center items-center">
          <div className="custom-loader"></div>
        </div>
      </div>
      ) : (
        <>
          <Sidebar permisos={permisos} />
          <div className="xl:col-span-5">
            <Header title={title} />
            <div className="h-[90vh] overflow-y-scroll p-8" id="main">
              <Outlet />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LayoutAdmin;