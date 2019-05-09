import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtlidadMesRoutingModule } from './utlidad-mes-routing.module';
import { UtilidadListMesComponent } from './utilidad-list-mes/utilidad-list-mes.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    UtlidadMesRoutingModule,
    SharedModule
  ],
  declarations: [UtilidadListMesComponent]
})
export class UtlidadMesModule { }
