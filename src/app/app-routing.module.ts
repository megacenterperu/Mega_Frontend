import { MainComponent } from './main/main.component';
import { LoginComponent } from './main/layout/login/login.component';
import { AuthGuard } from './core/guard/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    component:MainComponent,
    canActivate:[AuthGuard],
    loadChildren: './main/main.module#MainModule'
 },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
