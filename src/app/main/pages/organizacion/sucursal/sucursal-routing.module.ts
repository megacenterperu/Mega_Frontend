import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SucursalListComponent } from './sucursal-list/sucursal-list.component';
import { SucursalEditComponent } from './sucursal-edit/sucursal-edit.component';

const routes: Routes = [
  {
    path: "",
    component: SucursalListComponent
  },
  {
    path: "edicion/:id",
    component: SucursalEditComponent
  },
  { path: "nuevo", component: SucursalEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SucursalRoutingModule { }
