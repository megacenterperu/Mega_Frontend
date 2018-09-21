import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
    { path: '', redirectTo: 'ventas', pathMatch: 'full' },
    { path: 'ventas', loadChildren: '../main/pages/pages.module#PagesModule' }   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }