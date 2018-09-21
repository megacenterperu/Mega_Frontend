import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleListComponent } from './sample-list/sample-list.component';
import { SampleRoutingModule } from './sample-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SampleRoutingModule
  ],
  declarations: [SampleListComponent]
})
export class SampleModule { }
