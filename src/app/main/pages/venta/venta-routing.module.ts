import { VentaEditComponent } from './venta-edit/venta-edit.component';
import { VentaListComponent } from './venta-list/venta-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VentaDialogoComponent } from './venta-edit/venta-dialogo/venta-dialogo.component';
import { ClienteventaDialoComponent } from './venta-edit/clienteventa-dialo/clienteventa-dialo.component';
import { DialogConfirmationComponent } from './venta-list/dialog-confirmation/dialog-confirmation.component';
import { DetalleDialogVentaComponent } from './venta-list/detalle-dialog-venta/detalle-dialog-venta.component';


const routes: Routes = [
    {
        path: '',
        component: VentaListComponent
    },
    {
        path: 'edicion/:id',
        component: VentaEditComponent

    },
    { path: 'nuevo', component: VentaEditComponent },

    { path: 'popupVentas', component: VentaDialogoComponent },
    
    { path: 'NuevoCliente', component: ClienteventaDialoComponent },

    { path: 'VerdetalleVenta', component: DetalleDialogVentaComponent },

    { path: 'MensajeConfirmacion', component: DialogConfirmationComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VentaRoutingModule { }