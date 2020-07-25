import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportVentaMesRoutingModule } from './report-venta-mes-routing.module';
import { ReportVentaMesComponent } from './report-venta-mes/report-venta-mes.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReportVentaMesRoutingModule,
    SharedModule
  ],
  declarations: [ReportVentaMesComponent]
})
export class ReportVentaMesModule { }
