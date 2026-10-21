import { Component, OnInit } from '@angular/core';
import { HuespedesService, HuespedResponse } from '../huespedes.service';
import { AuthService } from '../../core/services/auth.service';
import { ROLES } from '../../core/models/usuario.model';
@Component({
  selector: 'app-huespedes-list',
  standalone: false,
  templateUrl: './huespedes-list.component.html',
  styleUrl: './huespedes-list.component.css'
})
export class HuespedListComponent implements OnInit {
  huespedes: HuespedResponse[] = [];
  cargando = false;
  isAdmin = false;

  constructor(private huespedesService: HuespedesService, private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.hasRole(ROLES[0]);
    this.cargarHuespedes();
  }

  cargarHuespedes(): void {
    this.cargando = true;
    this.huespedesService.obtenerHuespedes().subscribe({
      next: (data) => {
        this.huespedes = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar huéspedes', err);
        this.cargando = false;
      }
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar este huésped?')) {
      this.huespedesService.eliminarHuesped(id).subscribe(() => {
        this.cargarHuespedes();
      });
    }
  }
}