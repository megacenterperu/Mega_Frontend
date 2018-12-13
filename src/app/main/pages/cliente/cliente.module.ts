import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteEditComponent } from './cliente-edit/cliente-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ClienteRoutingModule,
    SharedModule
  ],
  declarations: [ClienteListComponent, ClienteEditComponent]
})
export class ClienteModule { }
