import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservaService, ReservaRequest } from '../reserva.service';

@Component({
  selector: 'app-crear-reserva',
  standalone: false,
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css']
})
export class CrearReservaComponent {
  reservaForm: FormGroup;
  mensajeError = '';
  mensajeExito = '';

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService,
    private router: Router
  ) {
    this.reservaForm = this.fb.group({
      idHuesped: ['', [Validators.required]],
      idHabitacion: ['', [Validators.required]],
      fechaEntrada: ['', [Validators.required]],
      fechaSalida: ['', [Validators.required]],
      numPersonas: [1, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.reservaForm.invalid) return;

    this.mensajeError = '';
    this.mensajeExito = '';

    const request: ReservaRequest = this.reservaForm.value;

    this.reservaService.crearReserva(request).subscribe({
      next: (response) => {
        this.mensajeExito = `¡Reserva creada con éxito! ID: ${response.id}, Total: $${response.precioTotal}`;
        setTimeout(() => {
          this.router.navigate(['/reservas']);
        }, 2000);
      },
      error: (err) => {
        if (err.status === 409) {
          this.mensajeError = 'Conflicto (409): La habitación ya tiene una reserva vigente en esas fechas.';
        } else if (err.status === 404) {
          this.mensajeError = 'El huésped o la habitación no existen / están inactivos.';
        } else {
          this.mensajeError = 'Ocurrió un error al procesar la reserva. Verifique los datos.';
        }
        console.error('Error al crear reserva:', err);
      }
    });
  }
}