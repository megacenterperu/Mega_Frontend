import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SampleListComponent } from './sample-list/sample-list.component';

const routes: Routes = [
    {
        path: '',
        component: SampleListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SampleRoutingModule { }