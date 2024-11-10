# Front-Angular-Capacitor

Este proyecto es una aplicación Angular integrada con Capacitor para desarrollar aplicaciones híbridas que pueden ser desplegadas tanto en Android como en la web. Se basa en Angular 17 y Capacitor 6, permitiendo aprovechar las últimas características de ambas tecnologías.

## Requisitos Previos

- **Node.js**: v20.13.1 (Asegúrate de tener esta versión instalada o superior)
- **NPM**: Generalmente viene instalado con Node.js
- **Angular CLI**: Se requiere la versión `@angular/cli` 17.3.8
- **Capacitor CLI**: Se requiere la versión `@capacitor/cli` 6.1.2

### Instalación

Para empezar a trabajar con este proyecto, sigue estos pasos:

1. **Clonar el repositorio**:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd front-angular-capacitor
   ```

2. **Instalar las dependencias**:

   Ejecuta el siguiente comando para instalar todas las dependencias del proyecto:

   ```bash
   npm install
   ```

## Scripts Disponibles

### Iniciar el Proyecto en Desarrollo

Este comando arranca el servidor de desarrollo de Angular y permite ver la aplicación en el navegador en modo desarrollo.

```bash
npm start
```

O bien, puedes ejecutar directamente:

```bash
ng serve
```

- La aplicación estará disponible en `http://localhost:4200/`

### Compilar para Producción

Este comando genera una build optimizada de la aplicación y sincroniza los archivos con la plataforma Android para Capacitor:

```bash
npm run build
```

Este script realiza los siguientes pasos:
1. Compila la aplicación Angular en modo producción.
2. Sincroniza los cambios con la plataforma Android usando Capacitor.
3. Abre Android Studio para poder probar o generar un APK:

```bash
ng build --configuration production && npx cap sync android && npx cap open android
```

### Sincronizar Capacitor (Sin Build)

Si solo deseas sincronizar los cambios con Android sin realizar una nueva compilación, puedes ejecutar:

```bash
npx cap sync android
```

### Desplegar en Dispositivo Android

Para desplegar la aplicación en un dispositivo físico o emulador, primero asegúrate de que Android Studio está configurado correctamente y de que un dispositivo está conectado o un emulador está corriendo. Luego ejecuta:

```bash
npm run build
```

### Ver los cambios en vivo (Watch Mode)

Este comando compila la aplicación en modo de desarrollo y detecta cambios automáticamente, permitiendo el desarrollo continuo con la plataforma web o móvil.

```bash
npm run watch
```

### Ejecutar Tests

Para correr las pruebas unitarias de la aplicación, ejecuta:

```bash
npm run test
```

Este comando usará `Karma` para ejecutar las pruebas configuradas con `Jasmine`.

### Versiones de Dependencias Clave

- **Angular**: 17.3.0
- **Capacitor**: 6.1.2
- **MDB Angular UI Kit**: 6.1.0
- **FontAwesome**: 6.6.0

## Estructura del Proyecto

- `src/`: Contiene todo el código fuente de la aplicación Angular.
- `capacitor.config.ts`: Archivo de configuración para Capacitor.
- `android/`: Directorio generado para la plataforma Android.
  
## Consideraciones Adicionales

- **Plataforma Android**: Este proyecto ya tiene configurada la plataforma Android. Para agregar otras plataformas, como iOS, puedes ejecutar:

  ```bash
  npx cap add ios
  ```

- **iOS**: Si vas a desplegar en iOS, debes tener una Mac con Xcode instalado y ejecutar el siguiente comando después de agregar la plataforma:

  ```bash
  npx cap open ios
  ```

## Contribuciones

Si deseas contribuir a este proyecto, por favor, realiza un fork del repositorio, crea una rama nueva, realiza tus cambios y luego abre un Pull Request.

---

¡Gracias por usar Front-Angular-Capacitor!