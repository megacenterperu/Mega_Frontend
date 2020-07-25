import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportVentaMesComponent } from './report-venta-mes/report-venta-mes.component';

const routes: Routes = [
  {
    path: "",
    component: ReportVentaMesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportVentaMesRoutingModule { }
