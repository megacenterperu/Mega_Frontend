import { ProductoDialogoComponent } from './compra-edit/producto-dialogo/producto-dialogo.component';
import { CompraEditComponent } from './compra-edit/compra-edit.component';
import { CompraListComponent } from './compra-list/compra-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalleDialogoCompraComponent } from './compra-list/detalle-dialogo-compra/detalle-dialogo-compra.component';
import { ProveedorDialogComponent } from './compra-edit/proveedor-dialog/proveedor-dialog.component';


const routes: Routes = [
    {
        path: '',
        component: CompraListComponent
    },
    {
        path: 'edicion:id',
        component: CompraEditComponent

    },
    { path: 'nuevo', component: CompraEditComponent },

    { path: 'NuevoPaciente', component: ProductoDialogoComponent },

    { path: 'NuevoProveedor', component: ProveedorDialogComponent },

    { path: 'VerdetalleCompra', component: DetalleDialogoCompraComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompraRoutingModule { }