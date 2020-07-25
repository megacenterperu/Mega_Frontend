import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentaDirectaRoutingModule } from './venta-directa-routing.module';
import { VentaDirectaEditComponent } from './venta-directa-edit/venta-directa-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClienteVentaDialogComponent } from './venta-directa-edit/cliente-venta-dialog/cliente-venta-dialog.component';
import { CobroDialogComponent } from './venta-directa-edit/cobro-dialog/cobro-dialog.component';
import { ProductoVentaDialogComponent } from './venta-directa-edit/producto-venta-dialog/producto-venta-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    VentaDirectaRoutingModule,
    SharedModule
  ],
  declarations: [VentaDirectaEditComponent, ClienteVentaDialogComponent, CobroDialogComponent, ProductoVentaDialogComponent]
})
export class VentaDirectaModule { }
