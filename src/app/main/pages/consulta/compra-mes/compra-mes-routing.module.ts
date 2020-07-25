import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompraListMesComponent } from './compra-list-mes/compra-list-mes.component';

const routes: Routes = [
  {
    path: "",
    component: CompraListMesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompraMesRoutingModule { }
