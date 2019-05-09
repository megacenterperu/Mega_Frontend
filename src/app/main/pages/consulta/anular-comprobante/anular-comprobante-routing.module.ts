import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VentaListComponent } from './venta-list/venta-list.component';

const routes: Routes = [
  {
    path: "",
    component: VentaListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnularComprobanteRoutingModule { }
