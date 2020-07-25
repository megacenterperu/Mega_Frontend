import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuListComponent } from './menu-list/menu-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuRolAsignarComponent } from './menu-rol-asignar/menu-rol-asignar.component';
import { SubmenuRolAsignarComponent } from './submenu-rol-asignar/submenu-rol-asignar.component';

@NgModule({
  imports: [
    CommonModule,
    MenuRoutingModule,
    SharedModule
  ],
  declarations: [MenuListComponent, MenuRolAsignarComponent, SubmenuRolAsignarComponent]
})
export class MenuModule { }
