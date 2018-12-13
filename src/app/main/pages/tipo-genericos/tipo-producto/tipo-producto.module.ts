import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TipoProductoListComponent } from "./tipo-producto-list/tipo-producto-list.component";
import { TipoProductoEditComponent } from "./tipo-producto-edit/tipo-producto-edit.component";
import { TipoProductoRoutingModule } from "./tipo-producto-routing.module";
import { SharedModule } from "../../../../shared/shared.module";

@NgModule({
  imports: [CommonModule, SharedModule, TipoProductoRoutingModule],
  declarations: [TipoProductoListComponent, TipoProductoEditComponent]
})
export class TipoProductoModule {}
