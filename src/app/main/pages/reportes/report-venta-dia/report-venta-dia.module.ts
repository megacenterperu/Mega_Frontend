import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportVentaDiaRoutingModule } from './report-venta-dia-routing.module';
import { ReportVentaDiaComponent } from './report-venta-dia/report-venta-dia.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReportVentaDiaRoutingModule,
    SharedModule
  ],
  declarations: [ReportVentaDiaComponent]
})
export class ReportVentaDiaModule { }
