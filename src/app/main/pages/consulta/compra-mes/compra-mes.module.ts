import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompraMesRoutingModule } from './compra-mes-routing.module';
import { CompraListMesComponent } from './compra-list-mes/compra-list-mes.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CompraMesRoutingModule,
    SharedModule
  ],
  declarations: [CompraListMesComponent]
})
export class CompraMesModule { }
