import { RegistroProductoRoutingModule } from './registro-producto-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RegistroProductoRoutingModule,
    SharedModule
  ],
  declarations: [DialogConfirmationComponent]
})
export class RegistroProductoModule { }
