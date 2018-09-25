import { PersonaEditComponent } from './persona-edit/persona-edit.component';
import { PersonaListComponent } from './persona-list/persona-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: PersonaListComponent
    },
    {
        path: 'edicion:id',
        component: PersonaEditComponent

    },
    { path: 'nuevo', component: PersonaEditComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProveedorRoutingModule { }