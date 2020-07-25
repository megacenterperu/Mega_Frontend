import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuiaListComponent } from './guia-list/guia-list.component';
import { GuiaEditComponent } from './guia-edit/guia-edit.component';
import { ProductoDialogComponent } from './guia-edit/producto-dialog/producto-dialog.component';
import { ClienteDialogComponent } from './guia-edit/cliente-dialog/cliente-dialog.component';
import { DetalleDialogGuiaComponent } from './guia-list/detalle-dialog-guia/detalle-dialog-guia.component';

const routes: Routes = [
  {
    path: '',
    component: GuiaListComponent
},
{
    path: 'edicion/:id',
    component: GuiaEditComponent

},
{ path: 'nuevo', component: GuiaEditComponent },

{ path: 'agregarProducto', component: ProductoDialogComponent },

{ path: 'nuevoCliente', component: ClienteDialogComponent },

{ path: 'detalleGuia', component: DetalleDialogGuiaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuiaRemisionRoutingModule { }
