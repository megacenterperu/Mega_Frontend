import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnularComprobanteRoutingModule } from './anular-comprobante-routing.module';
import { VentaListComponent } from './venta-list/venta-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AnularComprobanteRoutingModule,
    SharedModule
  ],
  declarations: [VentaListComponent]
})
export class AnularComprobanteModule { }
