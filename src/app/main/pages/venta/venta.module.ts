import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaListComponent } from './venta-list/venta-list.component';
import { VentaEditComponent } from './venta-edit/venta-edit.component';
import { VentaRoutingModule } from './venta-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { VentaDialogoComponent } from './venta-edit/venta-dialogo/venta-dialogo.component';
import { ClienteventaDialoComponent } from './venta-edit/clienteventa-dialo/clienteventa-dialo.component';
import { DialogConfirmationComponent } from './venta-list/dialog-confirmation/dialog-confirmation.component';
import { DetalleDialogVentaComponent } from './venta-list/detalle-dialog-venta/detalle-dialog-venta.component';
import { CobroComponent } from './venta-edit/cobro/cobro.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    VentaRoutingModule
  ],
  declarations: [VentaListComponent, VentaEditComponent, VentaDialogoComponent, ClienteventaDialoComponent, DialogConfirmationComponent, DetalleDialogVentaComponent, CobroComponent]
})
export class VentaModule { }
