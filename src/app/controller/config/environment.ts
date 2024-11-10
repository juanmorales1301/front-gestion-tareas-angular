interface IConfiguracionAPI {
  urlBase: string, // URL base para las solicitudes HTTP al backend.
  subdominio: string, // Subdominio específico para construir URLs completas hacia diferentes servicios.
  urlBaseWebSocket: string, // URL base para conexiones WebSocket.
}

// Configuración inicial de la API
const configuracionAPI: IConfiguracionAPI = {
  urlBase: "http://localhost:8000",
  subdominio: "api",
  urlBaseWebSocket: "",
}

// Configuración general del entorno
export const environment = {
  API: configuracionAPI, // Detalles de configuración de la API
  produccion: true, // Indica si la aplicación se ejecuta en un entorno de producción.
  dev_tools: true, // Habilita o deshabilita las herramientas de desarrollo.
  validarJWT: true, // Activa la validación de JWT para autenticar las solicitudes.
  rutaInicial: "/login", // Ruta inicial de la aplicación, generalmente para el login.
  rutaPrincipal: "/core", // Ruta de la página principal de la aplicación.
  rutaImagenes: "./assets/img", // Ruta base para las imágenes estáticas.
  rutaSonidos: "./assets/sounds", // Ruta base para los archivos de sonido.
}
