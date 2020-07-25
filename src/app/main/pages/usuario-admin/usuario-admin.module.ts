import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioAdminRoutingModule } from './usuario-admin-routing.module';
import { UsuarioAdminRolAsignarComponent } from './usuario-admin-rol-asignar/usuario-admin-rol-asignar.component';
import { UsuarioAdminEditComponent } from './usuario-admin-edit/usuario-admin-edit.component';
import { UsuarioAdminListComponent } from './usuario-admin-list/usuario-admin-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    UsuarioAdminRoutingModule,
    SharedModule
  ],
  declarations: [UsuarioAdminRolAsignarComponent, UsuarioAdminEditComponent, UsuarioAdminListComponent]
})
export class UsuarioAdminModule { }
