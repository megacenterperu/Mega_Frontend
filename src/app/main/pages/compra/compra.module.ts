import { CompraRoutingModule } from './compra-routing.module';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompraListComponent } from './compra-list/compra-list.component';
import { CompraEditComponent } from './compra-edit/compra-edit.component';
import { CompraWiewComponent } from './compra-wiew/compra-wiew.component';
import { ProductoDialogoComponent } from './compra-edit/producto-dialogo/producto-dialogo.component';
import { InlineEditComponent } from './compra-edit/producto-dialogo/inline-edit/inline-edit.component';
import { SatPopoverModule } from '@ncstate/sat-popover';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CompraRoutingModule,
    SatPopoverModule
  ],
  declarations: [CompraListComponent, CompraEditComponent, CompraWiewComponent, ProductoDialogoComponent, InlineEditComponent]
})
export class CompraModule { }
