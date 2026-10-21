import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface DatosHuesped {
  id_huesped?: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  tipo_documento: string;
  numero_documento: string;
  nacionalidad: string;
  estado_registro?: string;
}

export interface HuespedRequest {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  tipo_documento: string;
  numero_documento: string;
  nacionalidad: string;
}

export interface HuespedResponse {
  id_huesped: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  tipo_documento: string;
  numero_documento: string;
  nacionalidad: string;
  estado_registro: string;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class HuespedesService {
  private apiUrl = `${environment.apiUrl}/huespedes`; 

  constructor(private http: HttpClient) {}

  obtenerHuespedes(): Observable<HuespedResponse[]> {
    return this.http.get<HuespedResponse[]>(this.apiUrl);
  }

  obtenerHuespedPorId(id: number): Observable<HuespedResponse> {
    return this.http.get<HuespedResponse>(`${this.apiUrl}/${id}`);
  }

  crearHuesped(huesped: HuespedRequest): Observable<HuespedResponse> {
    return this.http.post<HuespedResponse>(this.apiUrl, huesped);
  }

  actualizarHuesped(id: number, huesped: HuespedRequest): Observable<HuespedResponse> {
    return this.http.put<HuespedResponse>(`${this.apiUrl}/${id}`, huesped);
  }

  eliminarHuesped(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}