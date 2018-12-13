import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'r-producto', pathMatch: 'full' },
  { path: 'r-categoria', loadChildren: '../../../main/pages/registro-producto/categoria/categoria.module#CategoriaModule' },
  { path: 'r-unidadmedida', loadChildren: '../../../main/pages/registro-producto/unidadmedida/unidadmedida.module#UnidadmedidaModule' },
  { path: 'r-producto', loadChildren: '../../../main/pages/registro-producto/producto/producto.module#ProductoModule' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroProductoRoutingModule { }
