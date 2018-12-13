import { ClienteDialogComponent } from './proforma-edit/cliente-dialog/cliente-dialog.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProformaListComponent } from './proforma-list/proforma-list.component';
import { ProformaEditComponent } from './proforma-edit/proforma-edit.component';
import { ProductoDialogComponent } from './proforma-edit/producto-dialog/producto-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: ProformaListComponent
},
{
    path: 'edicion/:id',
    component: ProformaEditComponent

},
{ path: 'nuevo', component: ProformaEditComponent },

{ path: 'NuevoPaciente', component: ProductoDialogComponent },

{ path: 'NuevoCliente', component: ClienteDialogComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProformaRoutingModule { }
