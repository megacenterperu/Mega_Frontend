import { GenericService } from './data/generic.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CompraService } from './data/compra.service';
import { ProveedorService } from './data/proveedor.service';
import { DataService } from './data/data.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    CompraService,
    ProveedorService,
    DataService,
    GenericService
  ]
})
export class CoreModule { }
