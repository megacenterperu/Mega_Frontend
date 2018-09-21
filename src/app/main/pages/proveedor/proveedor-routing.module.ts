import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProveedorListComponent } from './proveedor-list/proveedor-list.component';
import { ProveedorEditComponent } from './proveedor-edit/proveedor-edit.component';

const routes: Routes = [
    {
        path: '',
        component: ProveedorListComponent
    },
    {
        path: 'edicion:id',
        component: ProveedorEditComponent

    },
    { path: 'nuevo', component: ProveedorEditComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProveedorRoutingModule { }