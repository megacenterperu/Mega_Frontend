import { CompraRoutingModule } from './compra-routing.module';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompraListComponent } from './compra-list/compra-list.component';
import { CompraEditComponent } from './compra-edit/compra-edit.component';
import { CompraWiewComponent } from './compra-wiew/compra-wiew.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CompraRoutingModule
  ],
  declarations: [CompraListComponent, CompraEditComponent, CompraWiewComponent]
})
export class CompraModule { }
