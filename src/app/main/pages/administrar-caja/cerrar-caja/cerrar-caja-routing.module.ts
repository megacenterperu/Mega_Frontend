import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CajaListComponent } from './caja-list/caja-list.component';
import { CajaEditComponent } from './caja-edit/caja-edit.component';

const routes: Routes = [
  {
    path: "",
    component: CajaListComponent
  },
  {
    path: "edicion/:id",
    component: CajaEditComponent
  },
  { path: "nuevo", component: CajaEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CerrarCajaRoutingModule { }
