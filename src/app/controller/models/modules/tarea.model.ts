export interface TareaModel {
  id: number;
  titulo: string;
  descripcion: string;
  fecha_creacion: Date;
  fecha_inicio: Date;
  fecha_vencimiento: Date;
  prioridad: string;
  usuario_asignado: string;
  categoria?: string;
  tiempo_estimado?: string;
  tiempo_real?: number[];
  tags: string;
  estado: string;
}

export interface TareaCreateModel {
  titulo: string;
  descripcion: string;
  fecha_inicio: string;
  fecha_vencimiento: string;
  prioridad: string;
  categoria?: string;
  tiempo_estimado?: string;
  tiempo_real?: number[];
  tags: string;
  estado: string;
}
