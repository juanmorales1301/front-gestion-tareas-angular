import { CanMatchFn, Router  } from '@angular/router';
import { Injector } from '@angular/core';
import { SesionService } from '../core/sesion.service';
import { environment } from '../config/environment';


export function authGuardIsSesion(injector: Injector): CanMatchFn {
  return (route, segments) => {
    // Usa el inyector para obtener los servicios necesarios
    const authService = injector.get(SesionService);
    const router = injector.get(Router);

    const isLoggedIn = authService.isSesion();
    console.log(1, isLoggedIn);
    if (!isLoggedIn) {
      // Redirige al usuario a la página de inicio de sesión si no está autenticado
      router.navigate([environment.rutaPrincipal]);
      return false;
    }
    return true;
  };
}


export function authGuardLoadLogin(injector: Injector): CanMatchFn {
  return (route, segments) => {
    // Usa el inyector para obtener los servicios necesarios
    const authService = injector.get(SesionService);
    const router = injector.get(Router);

    const isLoggedIn = authService.isSesion();
    console.log(2, isLoggedIn);
    
    if (isLoggedIn) {
      // Redirige al usuario a la página de inicio si está autenticado
      router.navigate([environment.rutaInicial]);
      return false;
    }
    return true;
  };
}
