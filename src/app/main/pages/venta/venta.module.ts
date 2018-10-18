import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaListComponent } from './venta-list/venta-list.component';
import { VentaEditComponent } from './venta-edit/venta-edit.component';
import { VentaRoutingModule } from './venta-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    VentaRoutingModule
  ],
  declarations: [VentaListComponent, VentaEditComponent]
})
export class VentaModule { }
