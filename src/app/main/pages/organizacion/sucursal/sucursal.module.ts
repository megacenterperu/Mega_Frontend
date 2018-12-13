import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SucursalRoutingModule } from './sucursal-routing.module';
import { SucursalListComponent } from './sucursal-list/sucursal-list.component';
import { SucursalEditComponent } from './sucursal-edit/sucursal-edit.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SucursalRoutingModule,
    SharedModule
  ],
  declarations: [SucursalListComponent, SucursalEditComponent]
})
export class SucursalModule { }
