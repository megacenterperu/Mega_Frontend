import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavCollapseComponent } from './nav-collapse/nav-collapse.component';
import { NavGroupComponent } from './nav-group/nav-group.component';
import { NavItemComponent } from './nav-item/nav-item.component';
import { NavigationComponent } from './navigation.component';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    NavigationComponent
  ],
  declarations: [
    NavCollapseComponent,
    NavGroupComponent,
    NavItemComponent,
    NavigationComponent
  ]
})
export class NavigationModule { }
