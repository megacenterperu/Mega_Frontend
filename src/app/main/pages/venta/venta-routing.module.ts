import { VentaEditComponent } from './venta-edit/venta-edit.component';
import { VentaListComponent } from './venta-list/venta-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        component: VentaListComponent
    },
    {
        path: 'edicion/:id',
        component: VentaEditComponent

    },
    { path: 'nuevo', component: VentaEditComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VentaRoutingModule { }