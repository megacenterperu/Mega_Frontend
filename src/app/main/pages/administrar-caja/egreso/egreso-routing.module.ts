import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EgresoListComponent } from './egreso-list/egreso-list.component';
import { EgresoEditComponent } from './egreso-edit/egreso-edit.component';
import { EgresoViewComponent } from './egreso-view/egreso-view.component';

const routes: Routes = [
  {
    path: "",
    component: EgresoListComponent
  },
  {
    path: "edicion/:id",
    component: EgresoEditComponent
  },
  { path: "nuevo", component: EgresoEditComponent },

  { path: 'buscar', component: EgresoViewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EgresoRoutingModule { }
