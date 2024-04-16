import axios from "axios";

async function getPermisosDesdeToken(rol) {
  try {
    console.log("Rol del token:", rol);

    const response = await axios.get("http://localhost:8080/api/roles");
    console.log("Respuesta de la API:", response.data);

    const roles = response.data.roles;
    console.log("Roles encontrados:", roles);

    const rolEncontrado = roles.find((r) => r.rol === rol);
    console.log("Rol encontrado:", rolEncontrado);

    if (rolEncontrado) {
      if (Array.isArray(rolEncontrado.permisos)) {
        return rolEncontrado.permisos;
      } else {
        return [rolEncontrado.permisos];
      }
    } else {
      console.error("No se encontró el rol en la lista de roles.");
      return [];
    }
  } catch (error) {
    console.error("Error al obtener los permisos desde el token:", error);
    return [];
  }
}

export default getPermisosDesdeToken;