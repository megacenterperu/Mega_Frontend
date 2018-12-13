import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteEditComponent } from './cliente-edit/cliente-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ClienteListComponent
},
{
    path: 'edicion/:id',
    component: ClienteEditComponent

},
{ path: 'nuevo', component: ClienteEditComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
