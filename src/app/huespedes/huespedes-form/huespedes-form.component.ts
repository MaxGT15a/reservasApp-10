import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HuespedesService, HuespedRequest } from '../huespedes.service';

@Component({
  selector: 'app-huespedes-form',
  standalone: false,
  templateUrl: './huespedes-form.component.html',
  styleUrl: './huespedes-form.component.css'
})
export class HuespedFormComponent implements OnInit {
  huespedForm: FormGroup;
  idHuesped?: number;
  esEdicion = false;

  mensajeError: string | null = null;
  mensajeExito: string | null = null;

  tiposDocumentos = [
    { value: 'INE', label: 'INE' },
    { value: 'PASAPORTE', label: 'Pasaporte' },
    { value: 'LICENCIA', label: 'Licencia' }
  ];

  constructor(
    private fb: FormBuilder,
    private huespedesService: HuespedesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.huespedForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],      
      apellido: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],    
      email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]], 
      telefono: ['', [Validators.required, Validators.maxLength(10),Validators.minLength(10),Validators.pattern('^[0-9]*$')]],
      tipoDocumento: ['', [Validators.required]],                          
      numeroDocumento: ['', [Validators.required, Validators.maxLength(20),Validators.minLength(8),Validators.pattern('^[0-9]*$')]], 
      nacionalidad: ['', [Validators.required, Validators.maxLength(100)]]   
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idHuesped = +idParam;
      this.esEdicion = true;
      this.huespedesService.obtenerHuespedPorId(this.idHuesped).subscribe({
        next: (data) => {
          this.huespedForm.patchValue(data);
        },
        error: (err) => {
          this.mensajeError = 'No se pudo cargar la información del huésped.';
        }
      });
    }
  }

  guardar(): void {
    if (this.huespedForm.invalid) {
      this.huespedForm.markAllAsTouched();
      return;
    }

    // Limpiar alertas previas
    this.mensajeError = null;
    this.mensajeExito = null;

    const request: HuespedRequest = this.huespedForm.value;

    if (this.esEdicion && this.idHuesped) {
      this.huespedesService.actualizarHuesped(this.idHuesped, request).subscribe({
        next: () => {
          this.mensajeExito = 'Huésped actualizado con éxito.';
          setTimeout(() => this.router.navigate(['/huespedes']), 1500);
        },
        error: (err) => {
          this.mensajeError = err.error?.detail || 'Ocurrió un error al actualizar el huésped.';
        }
      });
    } else {
      this.huespedesService.crearHuesped(request).subscribe({
        next: () => {
          this.mensajeExito = 'Huésped registrado con éxito.';
          setTimeout(() => this.router.navigate(['/huespedes']), 1500);
        },
        error: (err) => {
          this.mensajeError = err.error?.detail || 'Ocurrió un error al registrar el huésped.';
        }
      });
    }
  }
}