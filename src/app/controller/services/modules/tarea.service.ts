import { Injectable } from '@angular/core';
import { TareaModel, TareaCreateModel } from '../../models/modules/tarea.model';
import { IDataResponse } from '../../models/core/auth';
import { HTTPInterceptorFactory } from '../../interceptors/http.factory';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  constructor(private http: HTTPInterceptorFactory) { }

  // Obtener todas las tareas
  obtenerTareas(): Promise<IDataResponse<TareaModel[]>> {
    return this.http.nuevaSolicitud('tarea', '', {}, true, 'Obteniendo tareas...', 'GET', true, true);
  }

  // Crear una nueva tarea
  crearTarea(tarea: TareaCreateModel): Promise<IDataResponse<TareaModel>> {
    return this.http.nuevaSolicitud('tarea', '', tarea, true, 'Creando tarea...', 'POST', true, true);
  }

  // Obtener una tarea por ID
  obtenerTareaPorId(id: string): Promise<IDataResponse<TareaModel>> {
    return this.http.nuevaSolicitud('tarea', id, {}, true, 'Obteniendo tarea...', 'GET', true, true);
  }

  // Actualizar una tarea
  actualizarTarea(id: string, tarea: TareaCreateModel): Promise<IDataResponse<TareaModel>> {
    return this.http.nuevaSolicitud('tarea', id, tarea, true, 'Actualizando tarea...', 'PUT', true, true);
  }

  // Eliminar una tarea
  eliminarTarea(id: string): Promise<IDataResponse<void>> {
    return this.http.nuevaSolicitud('tarea', id, {}, true, 'Eliminando tarea...', 'DELETE', true, true);
  }

  // Listar tareas por usuario_id
  listarTareasPorUsuario(usuarioId: string): Promise<IDataResponse<TareaModel[]>> {
    return this.http.nuevaSolicitud('tarea', `por-usuario/${usuarioId}`, {}, true, 'Obteniendo tareas del usuario...', 'GET', true, true);
  }
}
