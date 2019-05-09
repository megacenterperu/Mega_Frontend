import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';

const routes: Routes = [
  { path: '', redirectTo: 'r-consulta', pathMatch: 'full' },
  { path: 'listUtilidad', loadChildren: '../../../main/pages/consulta/utilidad/utilidad.module#UtilidadModule' },
  { path: 'listUtilidadMes', loadChildren: '../../../main/pages/consulta/utlidad-mes/utlidad-mes.module#UtlidadMesModule' },
  { path: 'listProductoAlmacen', loadChildren: '../../../main/pages/consulta/precio-producto-almacen/precio-producto-almacen.module#PrecioProductoAlmacenModule' },
  {path:'listVentaUsuario', loadChildren: '../../../main/pages/consulta/venta-porusuario/venta-porusuario.module#VentaPorusuarioModule' },
  {path:'listVentaPorAnular', loadChildren: '../../../main/pages/consulta/anular-comprobante/anular-comprobante.module#AnularComprobanteModule' },
  { path: 'MensajeDialog', component: DialogConfirmationComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaRoutingModule { }
