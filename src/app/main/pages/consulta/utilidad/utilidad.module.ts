import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilidadRoutingModule } from './utilidad-routing.module';
import { UtilidadListComponent } from './utilidad-list/utilidad-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    UtilidadRoutingModule,
    SharedModule
  ],
  declarations: [UtilidadListComponent]
})
export class UtilidadModule { }
