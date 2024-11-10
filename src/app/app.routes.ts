import { Routes } from '@angular/router';
import { authGuardIsSesion, authGuardLoadLogin } from './controller/guards/auth.guard';
import { environment } from './controller/config/environment';

export const routes: Routes = [
    { path: String(environment.rutaInicial).split("/").join(""), loadComponent: () => import('./view/core/login/login.component').then(c => c.LoginComponent), canMatch: [authGuardLoadLogin] },
    { path: String(environment.rutaPrincipal).split("/").join(""), loadChildren: () => import('./view/core/home/home.module').then(m => m.HomeModule), canMatch: [authGuardLoadLogin] },
    { path: '*', redirectTo: environment.rutaInicial },
    { path: '**', redirectTo: environment.rutaInicial },
];
