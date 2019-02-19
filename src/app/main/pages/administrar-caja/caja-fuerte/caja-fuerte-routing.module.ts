import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CajaFuerteListComponent } from './caja-fuerte-list/caja-fuerte-list.component';
import { CajaFuerteEditComponent } from './caja-fuerte-edit/caja-fuerte-edit.component';

const routes: Routes = [
  {
    path: "",
    component: CajaFuerteListComponent
  },
  {
    path: "edicion/:id",
    component: CajaFuerteEditComponent
  },
  { path: "nuevo", component: CajaFuerteEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CajaFuerteRoutingModule { }
