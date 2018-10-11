import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProformaRoutingModule } from './proforma-routing.module';
import { ProformaListComponent } from './proforma-list/proforma-list.component';
import { ProformaEditComponent } from './proforma-edit/proforma-edit.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ProformaRoutingModule,
    SharedModule
  ],
  declarations: [ProformaListComponent, ProformaEditComponent]
})
export class ProformaModule { }
