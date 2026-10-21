import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HuespedListComponent } from './huespedes-list/huespedes-list.component';
import { HuespedFormComponent } from './huespedes-form/huespedes-form.component';
// Importa tus componentes cuando los crees, por ejemplo:
// import { HuespedListComponent } from './huesped-list/huesped-list.component';
// import { HuespedFormComponent } from './huesped-form/huesped-form.component';

const routes: Routes = [
  {
    path: '',
    component: HuespedListComponent // Ruta base: /huespedes
  },
  {
    path: 'nuevo',
    component: HuespedFormComponent // Registrar nuevo huésped (utiliza HuespedRequest)
  },
  {
    path: 'editar/:id',
    component: HuespedFormComponent // Actualizar huésped por ID
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HuespedesRoutingModule { }