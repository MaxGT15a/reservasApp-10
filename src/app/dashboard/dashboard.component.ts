import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuarios/usuario.service';
import { AuthService } from '../core/services/auth.service';
import { ROLES } from '../core/models/usuario.model';
import { HuespedesService } from '../huespedes/huespedes.service';
import { HabitacionesService } from '../habitaciones/habitaciones.service';
import { ReservaService } from '../reserva/reserva.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  totalUsuarios = 0;
  totalHuespedes = 0;
  totalHabitaciones = 0;
  totalReservas = 0;
  cargando = true;
  isAdmin = false;

  constructor(
    private usuarioService: UsuarioService,
    private huespedService: HuespedesService,
    private habitacionService: HabitacionesService,
    private reservaService: ReservaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.hasRole(ROLES[0]);
    if(this.isAdmin) {
      this.listarUsuarios();
    }
    this.listarHuespedes();
    this.listarHabitaciones();
    this.listarReservasActivas();
  }

  listarUsuarios(): void {
    this.usuarioService.listar().subscribe({
      next: (data) => {
        this.totalUsuarios = data.length;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }
  listarHuespedes(): void {
    this.huespedService.obtenerHuespedes().subscribe({
      next: (data) => {
        this.totalHuespedes = data.length;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }
  listarHabitaciones(): void {
    this.habitacionService.obtenerHabitacionesActivas().subscribe({
      next: (data) => {
        this.totalHabitaciones = data.length;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }
    listarReservasActivas(): void {
    this.reservaService.obtenerReservas().subscribe({
      next: (data) => {
        this.totalReservas = data.length;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }
}