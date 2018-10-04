import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'r-producto', pathMatch: 'full' },
  { path: 'empresa', loadChildren: '../../../main/pages/organizacion/empresa/empresa.module#EmpresaModule' },
  { path: 'sucursal', loadChildren: '../../../main/pages/organizacion/sucursal/sucursal.module#SucursalModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizacionRoutingModule { }
