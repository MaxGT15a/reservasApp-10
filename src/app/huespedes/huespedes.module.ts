import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HuespedesRoutingModule } from './huespedes-routing.module';
import { MaterialModule } from '../material/material.module';
import { HuespedListComponent } from './huespedes-list/huespedes-list.component';
import { HuespedFormComponent } from './huespedes-form/huespedes-form.component';

@NgModule({
  declarations: [
    HuespedListComponent,
    HuespedFormComponent
  ],
  imports: [
    CommonModule,
    HuespedesRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class HuespedesModule { }