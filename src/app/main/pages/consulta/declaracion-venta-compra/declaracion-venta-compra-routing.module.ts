import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VentaViewComponent } from './venta-view/venta-view.component';

const routes: Routes = [
  {
    path: "",
    component: VentaViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeclaracionVentaCompraRoutingModule { }
