import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalAdminRoutingModule } from './personal-admin-routing.module';
import { PersonalAdminListComponent } from './personal-admin-list/personal-admin-list.component';
import { PersonalAdmimEditComponent } from './personal-admim-edit/personal-admim-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    PersonalAdminRoutingModule,
    SharedModule
  ],
  declarations: [PersonalAdminListComponent, PersonalAdmimEditComponent]
})
export class PersonalAdminModule { }
