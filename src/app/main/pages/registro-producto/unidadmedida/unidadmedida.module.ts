import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadmedidaRoutingModule } from './unidadmedida-routing.module';
import { UnidadmedidaListComponent } from './unidadmedida-list/unidadmedida-list.component';
import { UnidadmedidaEditComponent } from './unidadmedida-edit/unidadmedida-edit.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    UnidadmedidaRoutingModule,
    SharedModule
  ],
  declarations: [UnidadmedidaListComponent, UnidadmedidaEditComponent]
})
export class UnidadmedidaModule { }
