import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginUsuarioRoutingModule } from './login-usuario-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LoginUsuarioRoutingModule
  ],
  declarations: [],
  exports:[]
})
export class LoginUsuarioModule { }
