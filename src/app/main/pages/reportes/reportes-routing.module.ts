import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReportListProformaComponent } from "./report-list-proforma/report-list-proforma.component";

const routes: Routes = [
  {
    path: "",
    component: ReportListProformaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule {}
