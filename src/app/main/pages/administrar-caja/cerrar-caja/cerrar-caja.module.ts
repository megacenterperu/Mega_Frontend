import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CerrarCajaRoutingModule } from './cerrar-caja-routing.module';
import { CajaListComponent } from './caja-list/caja-list.component';
import { CajaEditComponent } from './caja-edit/caja-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CerrarCajaRoutingModule,
    SharedModule
  ],
  declarations: [CajaListComponent, CajaEditComponent]
})
export class CerrarCajaModule { }
