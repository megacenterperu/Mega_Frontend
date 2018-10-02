import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoListComponent } from './producto-list/producto-list.component';
import { ProductoEditComponent } from './producto-edit/producto-edit.component';

const routes: Routes = [
  {
    path: "",
    component: ProductoListComponent
  },
  {
    path: "edicion/:id",
    component: ProductoEditComponent
  },
  { path: "nuevo", component: ProductoEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
