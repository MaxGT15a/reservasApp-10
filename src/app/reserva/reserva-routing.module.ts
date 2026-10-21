import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservaListComponent } from './reserva-list/reserva-list.component';
import { CrearReservaComponent } from './crear-reserva/crear-reserva.component';
// import { ReservaListComponent } from './reserva-list/reserva-list.component';
// import { CrearReservaComponent } from './crear-reserva/crear-reserva.component';

const routes: Routes = [
  {
    path: '',
    component: ReservaListComponent // Ruta base: /reservas (muestra listado con ReservaResponse)
  },
  {
    path: 'crear',
    component: CrearReservaComponent // Operación compleja (envía ReservaRequest y maneja respuestas/conflictos)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservaRoutingModule { }