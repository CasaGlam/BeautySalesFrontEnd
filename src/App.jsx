import { BrowserRouter, Routes, Route } from "react-router-dom";

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






import Error404 from "./pages/Error404";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
        <Route path="/" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/ventas/registrar-venta" element={<RegistrarVenta />} />
          <Route path="/ventas/editar-venta" element={<EditarVenta />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/compras/registrar-compra" element={<RegistrarCompra />} />
          <Route path="/compras/editar-compra" element={<EditarCompra />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/usuarios/registrar-usuario" element={<RegistrarUsuario />} />
          <Route path="/usuarios/editar-usuario" element={<EditarUsuario />} />
          <Route path="/proveedores/registrar-proveedor" element={<RegistrarProveedor />} />
          <Route path="/proveedores/editar-proveedor" element={<EditarProveedor />} />
          <Route path="/productos/registrar-producto" element={<RegistrarProducto />} />
          <Route path="/productos/editar-producto" element={<EditarProducto />} />
          <Route path="/categorias/registrar-categoria" element={<RegistrarCategoria />} />
          <Route path="/categorias/editar-categoria" element={<EditarCategoria />} />
          <Route path="/clientes/registrar-cliente" element={<RegistrarCliente />} />
          <Route path="/clientes/editar-cliente" element={<EditarCliente />} />

        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
