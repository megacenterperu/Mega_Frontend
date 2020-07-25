import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoMasVendidoComponent } from './producto-mas-vendido/producto-mas-vendido.component';

const routes: Routes = [
  {
    path: "",
    component: ProductoMasVendidoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportProductoMasVentaRoutingModule { }
