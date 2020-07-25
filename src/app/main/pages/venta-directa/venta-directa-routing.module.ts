import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VentaDirectaEditComponent } from './venta-directa-edit/venta-directa-edit.component';
import { ClienteVentaDialogComponent } from './venta-directa-edit/cliente-venta-dialog/cliente-venta-dialog.component';
import { CobroDialogComponent } from './venta-directa-edit/cobro-dialog/cobro-dialog.component';
import { ProductoVentaDialogComponent } from './venta-directa-edit/producto-venta-dialog/producto-venta-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: VentaDirectaEditComponent
  },

  { path: 'nuevoVentadirecta', component: VentaDirectaEditComponent },

  { path: 'popupVentas', component: ProductoVentaDialogComponent },

  { path: 'NuevoCliente', component: ClienteVentaDialogComponent },

  //{ path: 'VerdetalleVenta', component: DetalleDialogVentaComponent },

  //{ path: 'MensajeConfirmacion', component: DialogConfirmationComponent },

  { path: 'cobro', component: CobroDialogComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentaDirectaRoutingModule { }
