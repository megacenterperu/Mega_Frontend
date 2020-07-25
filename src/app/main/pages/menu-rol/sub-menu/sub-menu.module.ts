import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubMenuRoutingModule } from './sub-menu-routing.module';
import { SubMenuListComponent } from './sub-menu-list/sub-menu-list.component';
import { SubMenuRolAsignarComponent } from './sub-menu-rol-asignar/sub-menu-rol-asignar.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SubMenuRoutingModule,
    SharedModule
  ],
  declarations: [SubMenuListComponent, SubMenuRolAsignarComponent]
})
export class SubMenuModule { }
