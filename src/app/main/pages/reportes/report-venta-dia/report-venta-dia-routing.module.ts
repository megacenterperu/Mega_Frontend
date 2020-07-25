import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportVentaDiaComponent } from './report-venta-dia/report-venta-dia.component';

const routes: Routes = [
  {
    path: "",
    component: ReportVentaDiaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportVentaDiaRoutingModule { }
