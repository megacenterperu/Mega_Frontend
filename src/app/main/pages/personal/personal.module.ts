import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalRoutingModule } from './personal-routing.module';
import { PersonalListComponent } from './personal-list/personal-list.component';
import { PersonalEditComponent } from './personal-edit/personal-edit.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    PersonalRoutingModule,
    SharedModule
  ],
  declarations: [PersonalListComponent, PersonalEditComponent]
})
export class PersonalModule { }
