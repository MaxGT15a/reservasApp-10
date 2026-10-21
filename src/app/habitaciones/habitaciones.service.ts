import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface DatosHabitacion {
  id_habitacion?: number;
  numero: string;
  tipoHabitacion: string;
  precio: number;
  capacidad: number;
  estado: string;
  estado_registro?: string;
}

export interface HabitacionRequest {
  numero: string;
  tipoHabitacion: string;
  precio: number;
  capacidad: number;
  estado: string;
}

export interface HabitacionResponse {
  id: number;
  numero: string;
  tipoHabitacion: string;
  precio: number;
  capacidad: number;
  estadoHabitacion: string;
  estado_registro: string;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {
  private apiUrl = `${environment.apiUrl}/habitaciones`;

  constructor(private http: HttpClient) {}

  obtenerHabitaciones(): Observable<HabitacionResponse[]> {
    return this.http.get<HabitacionResponse[]>(this.apiUrl);
  }

  obtenerHabitacionesActivas(): Observable<HabitacionResponse[]> {
    return this.obtenerHabitaciones().pipe(
      map(habitaciones => habitaciones.filter(h => h.estadoHabitacion === "Lista para asignarse")) 
    );
  }

  obtenerHabitacionPorId(id: number): Observable<HabitacionResponse> {
    return this.http.get<HabitacionResponse>(`${this.apiUrl}/${id}`);
  }

  crearHabitacion(habitacion: HabitacionRequest): Observable<HabitacionResponse> {
    return this.http.post<HabitacionResponse>(this.apiUrl, habitacion);
  }

  actualizarHabitacion(id: number, habitacion: HabitacionRequest): Observable<HabitacionResponse> {
    return this.http.put<HabitacionResponse>(`${this.apiUrl}/${id}`, habitacion);
  }

  eliminarHabitacion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}