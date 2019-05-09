import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentaPorusuarioRoutingModule } from './venta-porusuario-routing.module';
import { VentaPorusuarioListComponent } from './venta-porusuario-list/venta-porusuario-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    VentaPorusuarioRoutingModule,
    SharedModule
  ],
  declarations: [VentaPorusuarioListComponent]
})
export class VentaPorusuarioModule { }
