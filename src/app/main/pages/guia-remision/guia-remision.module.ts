import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuiaRemisionRoutingModule } from './guia-remision-routing.module';
import { GuiaEditComponent } from './guia-edit/guia-edit.component';
import { GuiaListComponent } from './guia-list/guia-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductoDialogComponent } from './guia-edit/producto-dialog/producto-dialog.component';
import { ClienteDialogComponent } from './guia-edit/cliente-dialog/cliente-dialog.component';
import { DetalleDialogGuiaComponent } from './guia-list/detalle-dialog-guia/detalle-dialog-guia.component';

@NgModule({
  imports: [
    CommonModule,
    GuiaRemisionRoutingModule,
    SharedModule
  ],
  declarations: [GuiaEditComponent, GuiaListComponent, ProductoDialogComponent, ClienteDialogComponent, DetalleDialogGuiaComponent]
})
export class GuiaRemisionModule { }
