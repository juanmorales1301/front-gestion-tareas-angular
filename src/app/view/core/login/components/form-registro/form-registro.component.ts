import { Component } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms'
import { AlertaService } from '../../../../../controller/services/utils/alerta.service';
import { AuthService } from '../../../../../controller/services/core/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-registro',
  standalone: true,
  imports: [MdbFormsModule, ReactiveFormsModule],
  templateUrl: './form-registro.component.html',
  styleUrl: './form-registro.component.scss'
})
export class FormRegistroComponent {
  public registroForm: FormGroup;

  constructor(
    private servAlert: AlertaService,
    private servAuth: AuthService,
    private fb: FormBuilder,
  ) {
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  

  async registroUsuario() {
    try {
      const data = this.registroForm.value;

      let result = await this.servAuth.registroUser(data);

      console.log(result);
    } catch (error: any) {
      this.servAlert.mostrarAlerta('Error en la solicitud', error, 'error');
    }
  }

  
}
