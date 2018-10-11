import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProformaListComponent } from './proforma-list/proforma-list.component';
import { ProformaEditComponent } from './proforma-edit/proforma-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ProformaListComponent
},
{
    path: 'edicion/:id',
    component: ProformaEditComponent

},
{ path: 'nuevo', component: ProformaEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProformaRoutingModule { }
