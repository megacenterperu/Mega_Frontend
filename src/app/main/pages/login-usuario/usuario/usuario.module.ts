import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsuarioRolAsignarComponent } from './usuario-rol-asignar/usuario-rol-asignar.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UsuarioRoutingModule
  ],
  declarations: [UsuarioListComponent, UsuarioEditComponent, UsuarioRolAsignarComponent]
})
export class UsuarioModule { }
