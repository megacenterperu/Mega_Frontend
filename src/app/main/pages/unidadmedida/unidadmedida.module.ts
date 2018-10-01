import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadmedidaRoutingModule } from './unidadmedida-routing.module';
import { UnidadmedidaListComponent } from './unidadmedida-list/unidadmedida-list.component';
import { UnidadmedidaEditComponent } from './unidadmedida-edit/unidadmedida-edit.component';

@NgModule({
  imports: [
    CommonModule,
    UnidadmedidaRoutingModule
  ],
  declarations: [UnidadmedidaListComponent, UnidadmedidaEditComponent]
})
export class UnidadmedidaModule { }
