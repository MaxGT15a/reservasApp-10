import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ReservaRoutingModule } from './reserva-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReservaListComponent } from './reserva-list/reserva-list.component';
import { CrearReservaComponent } from './crear-reserva/crear-reserva.component';


@NgModule({
  declarations: [
    ReservaListComponent,
    CrearReservaComponent
  ],
  imports: [
    CommonModule,
    ReservaRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class ReservaModule { }