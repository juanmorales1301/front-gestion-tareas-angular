import { Injectable } from '@angular/core';
import { UsuarioLoginModel, UsuarioModel } from '../../models/core/login.model';
import { IDataResponse } from '../../models/core/auth';
import { HTTPInterceptorFactory } from '../../interceptors/http.factory';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HTTPInterceptorFactory) { }

  authUser(DataUser: UsuarioModel): Promise<IDataResponse<UsuarioLoginModel>> {
    return this.http.nuevaSolicitud('auth', 'login', DataUser, true, 'Validando usuario...', 'POST', false, false);
  }

  registroUser(DataUser: UsuarioModel): Promise<IDataResponse<UsuarioLoginModel>> {
    return this.http.nuevaSolicitud('auth', 'register', DataUser, true, 'Creando usuario...', 'POST', false, false);
  }
}
