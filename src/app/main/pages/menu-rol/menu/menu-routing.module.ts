import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuRolAsignarComponent } from './menu-rol-asignar/menu-rol-asignar.component';
import { SubmenuRolAsignarComponent } from './submenu-rol-asignar/submenu-rol-asignar.component';

const routes: Routes = [
  {
    path: "",
    component: MenuListComponent
  },
  {
    path: "asignacion/:id",
    component: MenuRolAsignarComponent
  },
  {
    path: "asignarsubmenurol/:id",
    component: SubmenuRolAsignarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
