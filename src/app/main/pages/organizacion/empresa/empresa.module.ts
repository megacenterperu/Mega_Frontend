import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaListComponent } from './empresa-list/empresa-list.component';
import { EmpresaEditComponent } from './empresa-edit/empresa-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    SharedModule
  ],
  declarations: [EmpresaListComponent, EmpresaEditComponent]
})
export class EmpresaModule { }
