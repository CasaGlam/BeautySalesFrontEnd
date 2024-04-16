import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { obtenerDatosDesdeToken } from "./functions/token";
import getPermisosDesdeToken from "./functions/PermisosDesdeToken";

// Layouts
import LayoutAdmin from "./layouts/LayoutAdmin";

// Pages auth
import Login from "./pages/auth/Login";
import RecuperarContrasena from "./pages/auth/RecuperarContrasena";

// Pages admin
import Dashboard from "./pages/admin/Dashboard";
import Perfil from "./pages/admin/Perfil";
import Productos from "./pages/admin/productos";
import RegistrarProducto from "./pages/admin/RegistrarProducto";
import EditarProducto from "./pages/admin/EditarProductos";
import Categorias from "./pages/admin/Categorias";
import RegistrarCategoria from "./pages/admin/RegistrarCategoria";
import EditarCategoria from "./pages/admin/EditarCategorias";
import Ventas from "./pages/admin/Ventas";
import RegistrarVenta from "./pages/admin/RegistrarVenta";
import EditarVenta from "./pages/admin/EditarVenta";
import Compras from "./pages/admin/Compras";
import RegistrarCompra from "./pages/admin/RegistrarCompra";
import EditarCompra from "./pages/admin/EditarCompra";
import Proveedores from "./pages/admin/Proveedores";
import RegistrarProveedor from "./pages/admin/RegistrarProveedor";
import EditarProveedor from "./pages/admin/EditarProveedores";
import Clientes from "./pages/admin/clientes";
import RegistrarCliente from "./pages/admin/RegistrarCliente";
import EditarCliente from "./pages/admin/EditarCliente";
import Usuarios from "./pages/admin/Usuarios";
import RegistrarUsuario from "./pages/admin/RegistrarUsuario";
import EditarUsuario from "./pages/admin/EditarUsuario";
import Roles from "./pages/admin/Roles";
import RegistrarRol from "./pages/admin/RegistrarRol";
import EditarRol from "./pages/admin/EditarRol";

import Error404 from "./pages/Error404";

function App() {
  const [permisos, setPermisos] = useState([]);

  useEffect(() => {
    // Llama a la función para obtener los datos del token
    const tokenData = obtenerDatosDesdeToken();
    
    // Verifica si se obtuvieron los datos del token
    if (tokenData) {
      // Extrae el rol del tokenData
      const { rol } = tokenData;

      // Llama a la función para obtener los permisos basados en el rol
      const obtenerPermisos = async () => {
        try {
          const permisos = await getPermisosDesdeToken(rol);
          setPermisos(permisos);
        } catch (error) {
          console.error("Error al obtener permisos desde el token:", error);
        }
      };

      obtenerPermisos();
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
        <Route path="/" element={<LayoutAdmin />}>
          {permisos.includes("dashboard") && <Route index element={<Dashboard />} />}
          <Route path="/perfil" element={<Perfil />} />
          {permisos.includes("productos") && (
            <>
              <Route path="/productos" element={<Productos />} />
              <Route path="/productos/registrar-producto" element={<RegistrarProducto />} />
              <Route path="/productos/editar-producto/:objectId" element={<EditarProducto />} />
            </>
          )}
          {permisos.includes("categorias") && (
            <>
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/categorias/registrar-categoria" element={<RegistrarCategoria />} />
              <Route path="/categorias/editar-categoria/:objectId" element={<EditarCategoria />} />
            </>
          )}
          {permisos.includes("ventas") && (
            <>
              <Route path="/ventas" element={<Ventas />} />
              <Route path="/ventas/registrar-venta" element={<RegistrarVenta />} />
              <Route path="/ventas/editar-venta/:objectId" element={<EditarVenta />} />
            </>
          )}
          {permisos.includes("compras") && (
            <>
              <Route path="/compras" element={<Compras />} />
              <Route path="/compras/registrar-compra" element={<RegistrarCompra />} />
              <Route path="/compras/editar-compra/:objectId" element={<EditarCompra />} />
            </>
          )}
          {permisos.includes("proveedores") && (
            <>
              <Route path="/proveedores" element={<Proveedores />} />
              <Route path="/proveedores/registrar-proveedor" element={<RegistrarProveedor />} />
              <Route path="/proveedores/editar-proveedor/:objectId" element={<EditarProveedor />} />
            </>
          )}
          {permisos.includes("clientes") && (
            <>
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/clientes/registrar-cliente" element={<RegistrarCliente />} />
              <Route path="/clientes/editar-cliente/:objectId" element={<EditarCliente />} />
            </>
          )}
          {permisos.includes("usuarios") && (
            <>
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/usuarios/registrar-usuario" element={<RegistrarUsuario />} />
              <Route path="/usuarios/editar-usuario/:objectId" element={<EditarUsuario />} />
            </>
          )}
          {permisos.includes("roles") && (
            <>
              <Route path="/roles" element={<Roles />} />
              <Route path="/roles/registrar-rol" element={<RegistrarRol />} />
              <Route path="/roles/editar-rol/:objectId" element={<EditarRol />} />
            </>
          )}
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
