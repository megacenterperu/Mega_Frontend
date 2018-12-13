import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnidadmedidaListComponent } from './unidadmedida-list/unidadmedida-list.component';
import { UnidadmedidaEditComponent } from './unidadmedida-edit/unidadmedida-edit.component';

const routes: Routes = [
  {
    path: "",
    component: UnidadmedidaListComponent
  },
  {
    path: "edicion/:id",
    component: UnidadmedidaEditComponent
  },
  { path: "nuevo", component: UnidadmedidaEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadmedidaRoutingModule { }
