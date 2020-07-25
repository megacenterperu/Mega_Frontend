import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'listMenu', loadChildren: '../../../main/pages/menu-rol/menu/menu.module#MenuModule' },
  { path: 'ListSubMenu', loadChildren: '../../../main/pages/menu-rol/sub-menu/sub-menu.module#SubMenuModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRolRoutingModule { }
