import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolRoutingModule } from './rol-routing.module';
import { RolListComponent } from './rol-list/rol-list.component';
import { RolEditComponent } from './rol-edit/rol-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RolRoutingModule
  ],
  declarations: [RolListComponent, RolEditComponent]
})
export class RolModule { }
