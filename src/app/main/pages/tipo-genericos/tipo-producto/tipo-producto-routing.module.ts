import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TipoProductoListComponent } from "./tipo-producto-list/tipo-producto-list.component";
import { TipoProductoEditComponent } from "./tipo-producto-edit/tipo-producto-edit.component";

const routes: Routes = [
  {
    path: "",
    component: TipoProductoListComponent
  },
  {
    path: "edicion:id",
    component: TipoProductoEditComponent
  },
  { path: "nuevo", component: TipoProductoEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoProductoRoutingModule {}
