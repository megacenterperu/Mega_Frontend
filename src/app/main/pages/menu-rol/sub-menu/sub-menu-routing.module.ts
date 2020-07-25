import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubMenuListComponent } from './sub-menu-list/sub-menu-list.component';
import { SubMenuRolAsignarComponent } from './sub-menu-rol-asignar/sub-menu-rol-asignar.component';

const routes: Routes = [
  {
    path: "",
    component: SubMenuListComponent
  },
  {
    path: "asignacion/:id",
    component: SubMenuRolAsignarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubMenuRoutingModule { }
