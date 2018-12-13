import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';
import { CategoriaEditComponent } from './categoria-edit/categoria-edit.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CategoriaRoutingModule
],
  declarations: [CategoriaListComponent, CategoriaEditComponent]
})
export class CategoriaModule { }
