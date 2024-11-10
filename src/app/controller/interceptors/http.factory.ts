import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../config/environment';
import { SesionService } from '../core/sesion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IDataResponse } from '../models/core/auth';

@Injectable({
  providedIn: 'root'
})
export class HTTPInterceptorFactory {
  // Inyecta dependencias necesarias para realizar solicitudes HTTP, encriptar/desencriptar datos y utilizar funciones utilitarias.
  constructor(
    private http: HttpClient,
    private sesion: SesionService,
    private router: Router
  ) { }

  /**
   * Realiza una nueva solicitud HTTP a un endpoint específico.
   * 
   * @param modulo Identifica el módulo o base del endpoint.
   * @param end_point Identifica el endpoint específicoo función dentro del módulo.
   * @param datos Cuerpo de la solicitud, puede ser cualquier objeto JSON.
   * @param mostrarCarga Indica si se debe mostrar visualmente el proceso de carga.
   * @param mensajeCarga Mensaje a mostrar durante la carga.
   * @param metodo Método HTTP para la solicitud (GET, POST, PUT, DELETE).
   * @param incluirToken Indica si se debe incluir un token JWT en la solicitud.
   * @param usarBearer Indica si el token debe ser precedido por 'Bearer'.
   * @param tipoRespuesta Define el tipo esperado de respuesta (json, text, blob, arraybuffer).
   * @returns Promise<any> Retorna una promesa con la respuesta de la solicitud.
   */
  async nuevaSolicitud(
    modulo: string = "",
    end_point: string = "",
    datos: any,
    mostrarCarga: boolean = true,
    mensajeCarga: string = 'Cargando servicio.',
    metodo: string = 'POST',
    incluirToken: boolean = environment.validarJWT,
    usarBearer: boolean = true,
    tipoRespuesta: 'json' | 'text' | 'blob' | 'arraybuffer' | 'base64' = 'json',
  ): Promise<any> {
    const url = `${environment.API.urlBase}/${environment.API.subdominio ? environment.API.subdominio + '/' : ''}${modulo ? modulo + '/' : ''}${end_point ? end_point + '/' : ''}`;

    if (mostrarCarga) {
      await this.mostrarCarga(mensajeCarga);
    }

    try {
      const cabecera = await this.crearCabecera(metodo, datos, incluirToken, usarBearer);
      const resultado = await this.realizarSolicitudHTTP(metodo, url, datos, cabecera, tipoRespuesta);
      return Promise.resolve(resultado);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    } finally {
      if (mostrarCarga) {
        await this.cerrarCarga();
      }
    }
  }

  private async crearCabecera(metodo: string, datos: any, incluirToken: boolean, usarBearer: boolean): Promise<HttpHeaders> {
    let cabecera = new HttpHeaders();
    try {
      if (incluirToken) {
        usarBearer ? cabecera = cabecera.set('Authorization', usarBearer ? `Bearer ${this.sesion.getToken()}` : this.sesion.getToken()) : false;
        cabecera = cabecera.set('user', String(this.sesion.getUsuario()?.id_usuario));
      }

    } catch (error) {
      console.error(new Error("Error al generar encabezados de la solicitud"), error);
    } finally {
      return cabecera;
    }
  }

  // Realiza la solicitud HTTP utilizando los parámetros proporcionados.
  private async realizarSolicitudHTTP(metodo: string, url: string, datos: any, cabecera: HttpHeaders, tipoRespuesta: 'json' | 'text' | 'blob' | 'arraybuffer' | 'base64' = 'json'): Promise<any> {
    return new Promise((success, fallo) => {
      this.http.request<HttpResponse<any>>(metodo.toUpperCase(), url, {
        headers: cabecera,
        body: datos,
        responseType: (tipoRespuesta == 'base64' ? 'arraybuffer' : tipoRespuesta) as 'json',
        observe: 'response'
      }).subscribe({
        next: async (response) => {
          try {
            let body: IDataResponse<any> = response.body as any;

            if (body === null) {
              fallo(new Error("La respuesta no tiene cuerpo."));
              return;
            }

            if (body.correcto == true) {
              success(body);
            } else {
              fallo(body);
            }
          } catch (error) {
            fallo(error);
          }
        }, error: (error: any) => {
          this.validError(error, "Error de consumo");
        }, complete: () => {

        }
      })

    })
  }

  private async mostrarCarga(mensaje: string): Promise<void> {
    Swal.fire({
      title: mensaje,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  private async cerrarCarga(): Promise<void> {
    Swal.close();
  }

  private validError(Data: any, MensajeAdc: string = '') {
    if (
      Data.status == 400 ||
      Data.status == 401 ||
      Data.status == 402 ||
      Data.status == 403 ||
      Data.status == 405 ||
      Data.status == 406 ||
      Data.status == 407 ||
      Data.status == 408 ||
      Data.status == 409 ||
      Data.status == 411
    ) {
      this.router.navigate([environment.rutaInicial]);
    }

    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: MensajeAdc || Data.message || Data?.data?.message || Data?.data?.error || Data?.error?.mensaje || Data?.error,
    });
  }
}