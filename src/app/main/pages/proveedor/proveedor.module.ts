import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedorListComponent } from './proveedor-list/proveedor-list.component';
import { ProveedorEditComponent } from './proveedor-edit/proveedor-edit.component';
import { ProveedorViewComponent } from './proveedor-view/proveedor-view.component';
import { ProveedorRoutingModule } from './proveedor-routing.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProveedorRoutingModule
  ],
  declarations: [ProveedorListComponent, ProveedorEditComponent, ProveedorViewComponent]
})
export class ProveedorModule { }
