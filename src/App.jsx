import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import LayoutAdmin from "./layouts/LayoutAdmin";

// Pages auth
import Login from "./pages/auth/Login";
import RecuperarContrasena from "./pages/auth/RecuperarContrasena";

// Pages admin
import Home from "./pages/admin/Home";

import Error404 from "./pages/Error404";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
        <Route path="/" element={<LayoutAdmin />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
