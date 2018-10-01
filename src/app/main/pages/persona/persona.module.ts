import { ProveedorRoutingModule } from './persona-routing.module';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaListComponent } from './persona-list/persona-list.component';
import { PersonaEditComponent } from './persona-edit/persona-edit.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProveedorRoutingModule
  ],
  declarations: [PersonaListComponent, PersonaEditComponent]
})
export class PersonaModule { }
