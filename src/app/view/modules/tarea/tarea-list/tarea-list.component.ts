import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { TareaModel } from '../../../../controller/models/modules/tarea.model';
import { TareaService } from '../../../../controller/services/modules/tarea.service';
import { TareaEditComponent } from '../tarea-edit/tarea-edit.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarea-list',
  standalone: true,
  imports: [TareaEditComponent, MatPaginatorModule, MatTableModule, CommonModule],
  templateUrl: './tarea-list.component.html',
  styleUrl: './tarea-list.component.scss'
})
export class TareaListComponent {
  displayedColumns: string[] = [
    'id',
    'titulo',
    'descripcion',
    'fecha_creacion',
    'fecha_inicio',
    'fecha_vencimiento',
    'prioridad',
    'usuario_asignado',
    'categoria',
    'tiempo_estimado',
    'tags',
    'estado',
    'acciones'
  ];
  dataSource = new MatTableDataSource<TareaModel>();

  cambiEdit: boolean = false;

  selectedTarea: TareaModel | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tareaService: TareaService) { }

  ngOnInit(): void {
    this.loadTareas();
  }

  loadTareas(): void {
    this.tareaService.obtenerTareas().then((response) => {
      this.dataSource.data = response.data;
      this.dataSource.paginator = this.paginator;
    });
  }

  onEdit(tarea: TareaModel): void {
    this.cambiEdit = true;
    this.selectedTarea = tarea;

    setTimeout(() => {
      this.cambiEdit = false;
    }, 500)
  }

  onDelete(id: number): void {
    this.tareaService.eliminarTarea(id.toString()).then(() => {
      this.loadTareas();
    });
  }
}
