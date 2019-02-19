import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'egreso', pathMatch: 'full' },
  { path: 'egreso', loadChildren: '../../../main/pages/administrar-caja/egreso/egreso.module#EgresoModule' },
  { path: 'cerrarcaja', loadChildren: '../../../main/pages/administrar-caja/cerrar-caja/cerrar-caja.module#CerrarCajaModule' },
  { path: 'cerrarcajafuerte', loadChildren: '../../../main/pages/administrar-caja/caja-fuerte/caja-fuerte.module#CajaFuerteModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrarCajaRoutingModule { }
