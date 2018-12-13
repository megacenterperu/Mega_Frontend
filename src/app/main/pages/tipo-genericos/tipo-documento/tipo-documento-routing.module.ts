import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoDocumentoEditComponent } from './tipo-documento-edit/tipo-documento-edit.component';
import { TipoDocumentoListComponent } from './tipo-documento-list/tipo-documento-list.component';

const routes: Routes = [
  {
    path: '',
    component: TipoDocumentoListComponent
  },
  {
    path: 'edicion/:id',
    component: TipoDocumentoEditComponent
  },
  { path: 'nuevo', component: TipoDocumentoEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoDocumentoRoutingModule { }
