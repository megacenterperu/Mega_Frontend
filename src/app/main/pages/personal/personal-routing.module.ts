import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalListComponent } from './personal-list/personal-list.component';
import { PersonalEditComponent } from './personal-edit/personal-edit.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalListComponent
},
{
    path: 'edicion/:id',
    component: PersonalEditComponent

},
{ path: 'nuevo', component: PersonalEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }
