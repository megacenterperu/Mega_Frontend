import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';
import { UsuarioRolAsignarComponent } from './usuario-rol-asignar/usuario-rol-asignar.component';

const routes: Routes = [
  {
    path: "",
    component: UsuarioListComponent
  },
  {
    path: "asignacion/:id",
    component: UsuarioRolAsignarComponent
  },
  {
    path: "edicion/:id",
    component: UsuarioEditComponent
  },
  { path: "nuevo", component: UsuarioEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
