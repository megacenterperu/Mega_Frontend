import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportListProformaComponent } from './report-list-proforma/report-list-proforma.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReportesRoutingModule,
    PdfViewerModule
  ],
  declarations: [ReportListProformaComponent]
})
export class ReportesModule { }
