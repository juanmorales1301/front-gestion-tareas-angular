import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TareaCreateModel, TareaModel } from '../../../../controller/models/modules/tarea.model';
import { TareaService } from '../../../../controller/services/modules/tarea.service';
import { estados, prioridades } from '../../../../controller/mocks/modules/tarea.mock';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarea-edit',
  standalone: true,
  imports: [MdbFormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './tarea-edit.component.html',
  styleUrl: './tarea-edit.component.scss'
})
export class TareaEditComponent implements OnInit {
  @Input() tarea: TareaModel | null = null;
  @Output() formSubmit = new EventEmitter<void>(); 

  public prioridades = prioridades;
  public estados = estados;

  public tareaForm: FormGroup;
  editing = false;

  constructor(
    private fb: FormBuilder,
    private tareaService: TareaService
  ) {
    this.tareaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(255)]],
      descripcion: ['', [Validators.required]],
      fecha_inicio: ['', [Validators.required]],
      fecha_vencimiento: ['', [Validators.required]],
      prioridad: ['', [Validators.required]],
      categoria: [''],
      tiempo_estimado: [''],
      tags: ['', [Validators.required]],
      estado: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.tarea) {
      this.editing = true;
      this.tareaForm.patchValue({
        titulo: this.tarea.titulo,
        descripcion: this.tarea.descripcion,
        fecha_inicio: this.formatDate(this.tarea.fecha_inicio),
        fecha_vencimiento: this.formatDate(this.tarea.fecha_vencimiento),
        prioridad: this.tarea.prioridad,
        categoria: this.tarea.categoria,
        tiempo_estimado: this.tarea.tiempo_estimado,
        tags: this.tarea.tags,
        estado: this.tarea.estado,
      });
    }
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    const mes = ('0' + (d.getMonth() + 1)).slice(-2);
    const dia = ('0' + d.getDate()).slice(-2);
    const anio = d.getFullYear();
    return `${anio}-${mes}-${dia}`;
  }

  onSubmit(): void {
    if (this.tareaForm.invalid) {
      this.tareaForm.markAllAsTouched();
      return;
    }

    const tareaData: TareaCreateModel = {
      titulo: this.tareaForm.value.titulo,
      descripcion: this.tareaForm.value.descripcion,
      fecha_inicio: this.tareaForm.value.fecha_inicio,
      fecha_vencimiento: this.tareaForm.value.fecha_vencimiento,
      prioridad: this.tareaForm.value.prioridad,
      categoria: this.tareaForm.value.categoria,
      tiempo_estimado: this.tareaForm.value.tiempo_estimado,
      tiempo_real: [], // Asumiendo que no estás manejando este campo en el formulario
      tags: this.tareaForm.value.tags,
      estado: this.tareaForm.value.estado,
    };

    if (this.editing && this.tarea) {
      this.tareaService.actualizarTarea(this.tarea.id.toString(), tareaData).then((response) => {
        if (response.correcto) {
          alert('Tarea actualizada exitosamente.');
          this.formSubmit.emit();
          this.resetForm();
        } else {
          alert(`Error: ${response.mensaje}`);
        }
      }).catch(error => {
        console.error('Error al actualizar tarea:', error);
        alert('Ocurrió un error al actualizar la tarea.');
      });
    } else {
      this.tareaService.crearTarea(tareaData).then((response) => {
        if (response.correcto) {
          alert('Tarea creada exitosamente.');
          this.formSubmit.emit();
          this.resetForm();
        } else {
          alert(`Error: ${response.mensaje}`);
        }
      }).catch(error => {
        console.error('Error al crear tarea:', error);
        alert('Ocurrió un error al crear la tarea.');
      });
    }
  }

  resetForm(): void {
    this.tareaForm.reset();
    this.editing = false;
    this.tarea = null;
  }
}