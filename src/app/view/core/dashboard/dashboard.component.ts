import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { TareaService } from '../../../controller/services/modules/tarea.service';
import { TareaModel } from '../../../controller/models/modules/tarea.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'titulo', 'descripcion', 'fecha_vencimiento', 'estado'];
  dataSource = new MatTableDataSource<TareaModel>();
  proximasTareas: TareaModel[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private tareaService: TareaService) {}

  ngOnInit(): void {
    this.loadTareas();
  }

  loadTareas(): void {
    this.tareaService.obtenerTareas().then((response) => {
      if (response.correcto) {
        const tareas = response.data;
        const hoy = new Date();
        const tresDiasDespues = new Date();
        tresDiasDespues.setDate(hoy.getDate() + 3);

        this.proximasTareas = tareas.filter(tarea => {
          const fechaVencimiento = new Date(tarea.fecha_vencimiento);
          return fechaVencimiento >= hoy && fechaVencimiento <= tresDiasDespues;
        });

        this.dataSource.data = this.proximasTareas;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        alert('Error al cargar tareas: ' + response.mensaje);
      }
    }).catch(error => {
      console.error('Error al cargar tareas:', error);
      alert('Error al cargar tareas');
    });
  }
}