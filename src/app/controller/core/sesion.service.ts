import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDataResponse } from '../models/core/auth';
import { UsuarioLoginModel, UsuarioModel } from '../models/core/login.model';
import { Subject } from 'rxjs';
import { environment } from '../config/environment';

@Injectable({
  providedIn: 'root'
})
export class SesionService implements OnDestroy {
  private static _isSesion: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private router: Router, private route: ActivatedRoute) {
    SesionService._isSesion = this.getLocalStorageItem("_isSesion") === 'true'; // Convertir a boolean
  }

  ngOnDestroy() {
    // Emite un valor para que todas las suscripciones se desuscriban
    this.destroy$.next();
    // Completa el subject para asegurar que se liberen los recursos
    this.destroy$.complete();
  }

  iniciarSesion(dataSesion: IDataResponse<UsuarioLoginModel>) {
    if (dataSesion?.correcto == true) {
      this.setLocalStorageItem("usuario", JSON.stringify(dataSesion.data?.usuario));
      this.setLocalStorageItem("token", dataSesion.access_token);
      this.setLocalStorageItem("_isSesion", 'true');
      this.router.navigate([environment.rutaPrincipal]);
      SesionService._isSesion = true;
    }
  }

  cerrarSesion() {
    this.setLocalStorageItem("usuario", null);
    this.setLocalStorageItem("token", null);
    this.setLocalStorageItem("_isSesion", 'false');
    this.router.navigate([environment.rutaInicial]);
    this.clearLocalStorage();
    this.clearSessionStorage();
  }

  getUsuario(): UsuarioModel {
    try {
      const usuario = this.getLocalStorageItem("usuario");
      return usuario ? JSON.parse(usuario) : {} as UsuarioModel;
    } catch (error) {
      return {} as any;
    }
  }

  getToken(): string {
    try {
      return this.getLocalStorageItem("token") || '';
    } catch (error) {
      return '';
    }
  }

  isSesion() {
    SesionService._isSesion = this.getLocalStorageItem("_isSesion") === 'true';
    return SesionService._isSesion;
  }

  // Métodos auxiliares para interactuar con LocalStorage
  private setLocalStorageItem(key: string, value: any) {
    if (value === null || value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }
  }

  private getLocalStorageItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  private clearLocalStorage() {
    localStorage.clear();
  }

  private clearSessionStorage() {
    sessionStorage.clear();
  }
}