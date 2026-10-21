import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HabitacionesRoutingModule } from './habitaciones-routing.module';
import { MaterialModule } from '../material/material.module';
import { HabitacionListComponent } from './habitaciones-list/habitaciones-list.component';
import { HabitacionFormComponent } from './habitaciones-form/habitaciones-form.component';

@NgModule({
  declarations: [
    HabitacionListComponent,
    HabitacionFormComponent
  ],
  imports: [
    CommonModule,
    HabitacionesRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class HabitacionesModule { }