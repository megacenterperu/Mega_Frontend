import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportProductoMasVentaRoutingModule } from './report-producto-mas-venta-routing.module';
import { ProductoMasVendidoComponent } from './producto-mas-vendido/producto-mas-vendido.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReportProductoMasVentaRoutingModule,
    SharedModule
  ],
  declarations: [ProductoMasVendidoComponent]
})
export class ReportProductoMasVentaModule { }
