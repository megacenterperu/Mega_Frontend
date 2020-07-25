import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: '', redirectTo: 'r-consulta', pathMatch: 'full' },
  { path: 'reportVentaDia', loadChildren: '../../../main/pages/reportes/report-venta-dia/report-venta-dia.module#ReportVentaDiaModule' },
  { path: 'reportVentaMes', loadChildren: '../../../main/pages/reportes/report-venta-mes/report-venta-mes.module#ReportVentaMesModule' },
  { path: 'reportProductoMasVenta', loadChildren: '../../../main/pages/reportes/report-producto-mas-venta/report-producto-mas-venta.module#ReportProductoMasVentaModule' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule {}
