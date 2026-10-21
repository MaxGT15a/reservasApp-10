import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ReservaRequest {
  idHuesped: number;
  idHabitacion: number;
  fechaEntrada: string; // Formato 'YYYY-MM-DD'
  fechaSalida: string;  // Formato 'YYYY-MM-DD'
  numeroPersonas: number;
}

export interface HuespedInfo {
  nombreCompleto: string;
  email: string;
  telefono: string;
  documentoIdentidad: string;
  nacionalidad: string;
}

export interface HabitacionInfo {
  numero: string;
  precio: string;
  capacidad: string;
  tipoHabitacion: string;
}

export interface ReservaResponse {
  id: number;
  huesped: HuespedInfo;
  habitacion: HabitacionInfo;
  fechaEntrada: string;
  fechaSalida: string;
  numPersonas: number;
  precioNoche: number;
  precioTotal: number;
  estadoReserva: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = `${environment.apiUrl}/reservas`; 

  constructor(private http: HttpClient) {}

  obtenerReservas(): Observable<ReservaResponse[]> {
    return this.http.get<ReservaResponse[]>(this.apiUrl);
  }

  obtenerReservaPorId(id: number): Observable<ReservaResponse> {
    return this.http.get<ReservaResponse>(`${this.apiUrl}/${id}`);
  }

  crearReserva(reserva: ReservaRequest): Observable<ReservaResponse> {
    // Al enviar el ReservaRequest, el MS Reservas validará:
    // 1. Huésped ACTIVO
    // 2. Habitación ACTIVA y DISPONIBLE (cambiando a OCUPADA vía Feign)
    // 3. Capacidad y cálculo automático de montos
    // 4. Retornará 409 Conflict si hay choque de fechas
    return this.http.post<ReservaResponse>(this.apiUrl, reserva);
  }

  cancelarReserva(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}