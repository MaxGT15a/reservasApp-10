import { Component, OnInit } from '@angular/core';
import { HabitacionesService, HabitacionResponse } from '../habitaciones.service';

@Component({
  selector: 'app-habitaciones-list',
  standalone: false,
  templateUrl: './habitaciones-list.component.html',
  styleUrl: './habitaciones-list.component.css'
})
export class HabitacionListComponent implements OnInit {
  habitaciones: HabitacionResponse[] = [];
  cargando = false;

  constructor(private habitacionesService: HabitacionesService) {}

  ngOnInit(): void {
    this.cargarHabitaciones();
  }

  cargarHabitaciones(): void {
    this.cargando = true;
    this.habitacionesService.obtenerHabitaciones().subscribe({
      next: (data) => {
        this.habitaciones = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar habitaciones', err);
        this.cargando = false;
      }
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta habitación?')) {
      this.habitacionesService.eliminarHabitacion(id).subscribe(() => {
        this.cargarHabitaciones();
      });
    }
  }
}