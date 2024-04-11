// Función para obtener el nombre y correo del token JWT almacenado en localStorage
export function obtenerDatosDesdeToken() {
    // Obtiene el token JWT almacenado en localStorage
    const token = localStorage.getItem('token');
  
    // Verifica si el token existe
    if (token) {
      try {
        // Divide el token en sus partes: encabezado, payload y firma
        const [header, payload, signature] = token.split('.');
  
        // Decodifica el payload Base64 y lo convierte en una cadena legible
        const decodedPayload = JSON.parse(atob(payload));
  
        // Extrae los campos nombre y correo electrónico del payload decodificado
        const { nombre, correo, rol } = decodedPayload;
  
        // Devuelve un objeto con el nombre y correo electrónico
        return { nombre, correo, rol };
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null; // Devuelve null si hay un error al decodificar el token
      }
    } else {
      console.error('No se encontró ningún token en el localStorage.');
      return null; // Devuelve null si no se encuentra ningún token en el localStorage
    }
  }
  