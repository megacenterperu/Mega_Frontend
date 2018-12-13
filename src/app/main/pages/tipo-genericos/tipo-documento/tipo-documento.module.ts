import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoDocumentoEditComponent } from './tipo-documento-edit/tipo-documento-edit.component';
import { TipoDocumentoListComponent } from './tipo-documento-list/tipo-documento-list.component';
import { TipoDocumentoRoutingModule } from './tipo-documento-routing.module';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  imports: [CommonModule, SharedModule, TipoDocumentoRoutingModule],
  declarations: [TipoDocumentoListComponent, TipoDocumentoEditComponent]
})
export class TipoDocumentoModule { }
