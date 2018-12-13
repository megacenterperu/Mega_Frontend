import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProformaRoutingModule } from "./proforma-routing.module";
import { ProformaListComponent } from "./proforma-list/proforma-list.component";
import { ProformaEditComponent } from "./proforma-edit/proforma-edit.component";
import { SharedModule } from "../../../shared/shared.module";
import { SatPopoverModule } from "@ncstate/sat-popover";
import { ProductoDialogComponent } from "./proforma-edit/producto-dialog/producto-dialog.component";
import { ClienteDialogComponent } from "./proforma-edit/cliente-dialog/cliente-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    ProformaRoutingModule,
    SharedModule,
    SatPopoverModule
  ],
  declarations: [
    ProformaListComponent,
    ProformaEditComponent,
    ProductoDialogComponent,
    ClienteDialogComponent
  ]
})
export class ProformaModule {}
