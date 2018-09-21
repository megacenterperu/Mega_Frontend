import { LayoutModule } from './layout/layout.module';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    LayoutModule
  ],
  exports: [
    MainComponent
  ]
})

export class MainModule { }
