import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../../controller/config/environment';

const routes: Routes = [
  {
    path: '', loadComponent: () => import('./main-container-admin/main-container-admin.component').then(c => c.MainContainerAdminComponent),
    children: [
      //Modulos Core
      { path: 'dashboard', loadComponent: () => import('./../dashboard/dashboard.component').then(c => c.DashboardComponent) },


      //Modulos del negocio
      { path: 'tarea', loadChildren: () => import('../../modules/tarea/tarea.module').then(m => m.TareaModule) },
      

      
      //Redireccionamiento de paginas no encontradas
      { path: '', redirectTo: environment.rutaPrincipal + '/dashboard', pathMatch: 'full' },
      { path: '*', redirectTo: environment.rutaPrincipal + '/dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: environment.rutaPrincipal + '/dashboard', pathMatch: 'full' },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
