import { Component } from '@angular/core';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { FormRegistroComponent } from './components/form-registro/form-registro.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormLoginComponent, FormRegistroComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public isRegistro: boolean = false;


  changeRegistro(evento: boolean) {
    this.isRegistro = evento;
  }
}
