import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaRoutingModule } from './consulta-routing.module';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ConsultaRoutingModule,
    SharedModule
  ],
  declarations: [DialogConfirmationComponent]
})
export class ConsultaModule { }
