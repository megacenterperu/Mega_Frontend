import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRolRoutingModule } from './menu-rol-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MenuRolRoutingModule,
    SharedModule
  ],
  declarations: []
})
export class MenuRolModule { }
