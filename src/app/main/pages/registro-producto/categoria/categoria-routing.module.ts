import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';
import { CategoriaEditComponent } from './categoria-edit/categoria-edit.component';

const routes: Routes = [
  {
    path: "",
    component: CategoriaListComponent
  },
  {
    path: "edicion/:id",
    component: CategoriaEditComponent
  },
  { path: "nuevo", component: CategoriaEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaRoutingModule { }
