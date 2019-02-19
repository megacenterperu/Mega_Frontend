import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolListComponent } from './rol-list/rol-list.component';
import { RolEditComponent } from './rol-edit/rol-edit.component';

const routes: Routes = [
  {
    path: "",
    component: RolListComponent
  },
  {
    path: "edicion/:id",
    component: RolEditComponent
  },
  { path: "nuevo", component: RolEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolRoutingModule { }
