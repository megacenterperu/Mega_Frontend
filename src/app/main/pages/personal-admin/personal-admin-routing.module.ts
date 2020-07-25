import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalAdminListComponent } from './personal-admin-list/personal-admin-list.component';
import { PersonalAdmimEditComponent } from './personal-admim-edit/personal-admim-edit.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalAdminListComponent
},
{
    path: 'edicion/:id',
    component: PersonalAdmimEditComponent

},
{ path: 'nuevo', component: PersonalAdmimEditComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalAdminRoutingModule { }
