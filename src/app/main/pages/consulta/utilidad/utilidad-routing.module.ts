import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UtilidadListComponent } from './utilidad-list/utilidad-list.component';

const routes: Routes = [
  {
    path: "",
    component: UtilidadListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilidadRoutingModule { }
