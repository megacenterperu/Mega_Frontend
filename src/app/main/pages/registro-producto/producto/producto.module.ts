import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoListComponent } from './producto-list/producto-list.component';
import { ProductoEditComponent } from './producto-edit/producto-edit.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ProductoRoutingModule,
    SharedModule
  ],
  declarations: [ProductoListComponent, ProductoEditComponent]
})
export class ProductoModule { }
