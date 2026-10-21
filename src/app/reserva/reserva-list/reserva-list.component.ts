import { Component, OnInit } from '@angular/core';
import { ReservaService, ReservaResponse } from '../reserva.service';

@Component({
  selector: 'app-reserva-list',
  standalone: false,
  templateUrl: './reserva-list.component.html',
  styleUrl: './reserva-list.component.css'
})
export class ReservaListComponent implements OnInit {
  reservas: ReservaResponse[] = [];
  cargando = false;

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.cargando = true;
    this.reservaService.obtenerReservas().subscribe({
      next: (data) => {
        this.reservas = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar reservas', err);
        this.cargando = false;
      }
    });
  }

  cancelar(id: number): void {
    if (confirm('¿Deseas cancelar esta reserva?')) {
      this.reservaService.cancelarReserva(id).subscribe(() => {
        this.cargarReservas();
      });
    }
  }
}