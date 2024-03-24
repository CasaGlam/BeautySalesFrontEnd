import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import LayoutAdmin from "./layouts/LayoutAdmin";

// Pages auth
import Login from "./pages/auth/Login";
import RecuperarContrasena from "./pages/auth/RecuperarContrasena";

// Pages admin
import Dashboard from "./pages/admin/Dashboard";
import Perfil from "./pages/admin/Perfil";
import Registrar from "./pages/admin/Registrar";
import Proveedor from "./pages/admin/Proveedor";
import Productos from "./pages/admin/productos";
import Categorias from "./pages/admin/Categorias";
import Clientes from "./pages/admin/clientes";

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
          <Route path="/ventas/registrar" element={<Registrar />} />
          <Route path="/proveedor" element={<Proveedor />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/clientes" element={<Clientes />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
