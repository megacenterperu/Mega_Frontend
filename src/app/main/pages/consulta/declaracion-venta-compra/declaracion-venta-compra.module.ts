import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeclaracionVentaCompraRoutingModule } from './declaracion-venta-compra-routing.module';
import { VentaViewComponent } from './venta-view/venta-view.component';
import { ComperaViewComponent } from './compera-view/compera-view.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DeclaracionVentaCompraRoutingModule,
    SharedModule
  ],
  declarations: [VentaViewComponent, ComperaViewComponent],
  
  providers: []
})
export class DeclaracionVentaCompraModule { }
