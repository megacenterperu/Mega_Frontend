import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoPrecioListComponent } from './producto-precio-list/producto-precio-list.component';

const routes: Routes = [
  {
    path: "",
    component: ProductoPrecioListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrecioProductoAlmacenRoutingModule { }
