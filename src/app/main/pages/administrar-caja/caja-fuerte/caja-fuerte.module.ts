import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CajaFuerteRoutingModule } from './caja-fuerte-routing.module';
import { CajaFuerteListComponent } from './caja-fuerte-list/caja-fuerte-list.component';
import { CajaFuerteEditComponent } from './caja-fuerte-edit/caja-fuerte-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CajaFuerteRoutingModule,
    SharedModule
  ],
  declarations: [CajaFuerteListComponent, CajaFuerteEditComponent]
})
export class CajaFuerteModule { }
