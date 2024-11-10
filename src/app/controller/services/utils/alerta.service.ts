import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

export type TIconoAlert = 'info' | 'success' | 'question' | 'warning' | 'error'

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor() { }

  async mostrarAlerta(titulo: string, descripcion: any, icono: TIconoAlert = 'info', strBotonConfirma: string = 'Aceptar'): Promise<void> {
    if(descripcion?.error) descripcion = descripcion.error;
    if(descripcion?.mensaje) descripcion = descripcion.mensaje;
    
    return new Promise<void>((resolve) => {
      Swal.fire({
        title: titulo,
        text: descripcion,
        icon: icono,
        confirmButtonText: strBotonConfirma,
        allowOutsideClick: false,
      }).then(() => {
        resolve();
      });
    });
  }
}
