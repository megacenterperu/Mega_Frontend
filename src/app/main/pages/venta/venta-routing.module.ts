import { VentaEditComponent } from './venta-edit/venta-edit.component';
import { VentaListComponent } from './venta-list/venta-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VentaDialogoComponent } from './venta-edit/venta-dialogo/venta-dialogo.component';


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

    { path: 'popupVentas', component: VentaDialogoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VentaRoutingModule { }