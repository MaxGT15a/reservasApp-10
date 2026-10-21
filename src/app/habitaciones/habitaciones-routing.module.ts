import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HabitacionListComponent } from './habitaciones-list/habitaciones-list.component';
import { HabitacionFormComponent } from './habitaciones-form/habitaciones-form.component';
// import { HabitacionListComponent } from './habitacion-list/habitacion-list.component';
// import { HabitacionFormComponent } from './habitacion-form/habitacion-form.component';

const routes: Routes = [
  {
    path: '',
    component: HabitacionListComponent // Ruta base: /habitaciones
  },
  {
    path: 'nuevo',
    component: HabitacionFormComponent // Registrar nueva habitación (utiliza HabitacionRequest)
  },
  {
    path: 'editar/:id',
    component: HabitacionFormComponent // Actualizar habitación por ID
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HabitacionesRoutingModule { }