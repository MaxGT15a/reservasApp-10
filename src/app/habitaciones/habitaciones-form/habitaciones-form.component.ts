import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HabitacionesService, HabitacionRequest } from '../habitaciones.service';

@Component({
  selector: 'app-habitaciones-form',
  standalone: false,
  templateUrl: './habitaciones-form.component.html',
  styleUrl: './habitaciones-form.component.css'
})
export class HabitacionFormComponent implements OnInit {
  habitacionForm: FormGroup;
  id?: number;
  esEdicion = false;
  estados = ['DISPONIBLE', 'OCUPADA', 'LIMPIEZA', 'MANTENIMIENTO'];

  tiposHabitacion = [
    { value: 'SENCILLA', label: 'Sencilla' },
    { value: 'DOBLE', label: 'Doble' },
    { value: 'SUITE', label: 'Suite' }
  ];

  constructor(
    private fb: FormBuilder,
    private habitacionesService: HabitacionesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.habitacionForm = this.fb.group({
      numero: ['', [Validators.required]],
      tipoHabitacion: ['', [Validators.required]],
      precio: [0, [Validators.required, Validators.min(0)]],
      capacidad: [1, [Validators.required, Validators.min(1)]],
      estado: ['DISPONIBLE', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.esEdicion = true;
      this.habitacionesService.obtenerHabitacionPorId(this.id).subscribe((data) => {
        this.habitacionForm.patchValue(data);
      });
    }
  }

  guardar(): void {
    if (this.habitacionForm.invalid) return;

    const request: HabitacionRequest = this.habitacionForm.value;

    if (this.esEdicion && this.id) {
      this.habitacionesService.actualizarHabitacion(this.id, request).subscribe(() => {
        this.router.navigate(['/habitaciones']);
      });
    } else {
      this.habitacionesService.crearHabitacion(request).subscribe(() => {
        this.router.navigate(['/habitaciones']);
      });
    }
  }
}