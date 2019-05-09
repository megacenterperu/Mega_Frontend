import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VentaPorusuarioListComponent } from './venta-porusuario-list/venta-porusuario-list.component';

const routes: Routes = [
  {
    path: "",
    component: VentaPorusuarioListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentaPorusuarioRoutingModule { }
