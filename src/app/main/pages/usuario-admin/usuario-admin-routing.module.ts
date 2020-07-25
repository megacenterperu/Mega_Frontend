import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioAdminListComponent } from './usuario-admin-list/usuario-admin-list.component';
import { UsuarioAdminRolAsignarComponent } from './usuario-admin-rol-asignar/usuario-admin-rol-asignar.component';
import { UsuarioAdminEditComponent } from './usuario-admin-edit/usuario-admin-edit.component';

const routes: Routes = [
  {
    path: "",
    component: UsuarioAdminListComponent
  },
  {
    path: "asignacion/:id",
    component: UsuarioAdminRolAsignarComponent
  },
  {
    path: "edicion/:id",
    component: UsuarioAdminEditComponent
  },
  { path: "nuevo", component: UsuarioAdminEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioAdminRoutingModule { }
