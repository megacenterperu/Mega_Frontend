import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresaListComponent } from './empresa-list/empresa-list.component';
import { EmpresaEditComponent } from './empresa-edit/empresa-edit.component';

const routes: Routes = [
  {
    path: "",
    component: EmpresaListComponent
  },
  {
    path: "edicion/:id",
    component: EmpresaEditComponent
  },
  { path: "nuevo", component: EmpresaEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
