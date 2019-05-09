import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrecioProductoAlmacenRoutingModule } from './precio-producto-almacen-routing.module';
import { ProductoPrecioListComponent } from './producto-precio-list/producto-precio-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    PrecioProductoAlmacenRoutingModule,
    SharedModule
  ],
  declarations: [ProductoPrecioListComponent]
})
export class PrecioProductoAlmacenModule { }
