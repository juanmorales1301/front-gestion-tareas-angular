import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.scss'
})
export class MenuAdminComponent {

  constructor(
    private router: Router
  ){

  }

  public menuAdmin: {
    icono: string,
    texto: string,
    ruta: string
  }[] = [
      { icono: "fa-solid fa-list", texto: "Listar Tareas", ruta: "/tarea/listar" },
      { icono: "fa-solid fa-table-columns", texto: "Tareas Proximas", ruta: "/dashboard" },
  ]


  abrirRuta(Ruta: string){
    this.router.navigate(['/core' +Ruta])
  }
}
