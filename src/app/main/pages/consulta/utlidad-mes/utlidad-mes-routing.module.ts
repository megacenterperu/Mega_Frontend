import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UtilidadListMesComponent } from './utilidad-list-mes/utilidad-list-mes.component';

const routes: Routes = [
  {
    path: "",
    component: UtilidadListMesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtlidadMesRoutingModule { }
