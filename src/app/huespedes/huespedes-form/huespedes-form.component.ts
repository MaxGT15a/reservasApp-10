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

  constructor(
    private fb: FormBuilder,
    private huespedesService: HuespedesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.huespedForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      apellido: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      tipoDocumento: ['', [Validators.required]],
      numeroDocumento: ['', [Validators.required]],
      nacionalidad: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idHuesped = +idParam;
      this.esEdicion = true;
      this.huespedesService.obtenerHuespedPorId(this.idHuesped).subscribe((data) => {
        this.huespedForm.patchValue(data);
      });
    }
  }

  guardar(): void {
    if (this.huespedForm.invalid) return;

    const request: HuespedRequest = this.huespedForm.value;

    if (this.esEdicion && this.idHuesped) {
      this.huespedesService.actualizarHuesped(this.idHuesped, request).subscribe(() => {
        this.router.navigate(['/huespedes']);
      });
    } else {
      this.huespedesService.crearHuesped(request).subscribe(() => {
        this.router.navigate(['/huespedes']);
      });
    }
  }
}