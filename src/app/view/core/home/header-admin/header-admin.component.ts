import { Component } from '@angular/core';
import { SesionService } from '../../../../controller/core/sesion.service';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.scss'
})
export class HeaderAdminComponent {

  constructor(
    private session: SesionService
  ){

  }

  cerraSesion(){
    this.session.cerrarSesion();
  }
}
