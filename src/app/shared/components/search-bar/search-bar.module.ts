import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SearchBarComponent } from './search-bar.component';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  declarations: [
    SearchBarComponent
  ],
  exports: [
    SearchBarComponent
  ]
})
export class SearchBarModule { }
