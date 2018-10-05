import { ProductoDialogoComponent } from './compra-edit/producto-dialogo/producto-dialogo.component';
import { CompraEditComponent } from './compra-edit/compra-edit.component';
import { CompraListComponent } from './compra-list/compra-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


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

    { path: 'NuevoPaciente', component: ProductoDialogoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompraRoutingModule { }