import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EgresoRoutingModule } from './egreso-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EgresoListComponent } from './egreso-list/egreso-list.component';
import { EgresoEditComponent } from './egreso-edit/egreso-edit.component';
import { EgresoViewComponent } from './egreso-view/egreso-view.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EgresoRoutingModule
  ],
  declarations: [EgresoListComponent, EgresoEditComponent, EgresoViewComponent]
})
export class EgresoModule { }
