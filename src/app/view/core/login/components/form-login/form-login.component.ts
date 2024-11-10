import { Component, EventEmitter, Output } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms'
import { AlertaService } from '../../../../../controller/services/utils/alerta.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../../controller/services/core/auth.service';
import { SesionService } from '../../../../../controller/core/sesion.service';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [MdbFormsModule, ReactiveFormsModule],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss'
})
export class FormLoginComponent {
  @Output() public setRegistro: EventEmitter<boolean> = new EventEmitter(false);
  public loginForm: FormGroup;

  constructor(
    private servAlert: AlertaService,
    private servAuth: AuthService,
    private fb: FormBuilder,
    private sesion: SesionService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    try {
      const data = this.loginForm.value;

      let result = await this.servAuth.authUser(data);

      this.sesion.iniciarSesion(result);
      console.log(result);
    } catch (error: any) {
      this.servAlert.mostrarAlerta('Error en la solicitud', error, 'error');
    }
  }
}
