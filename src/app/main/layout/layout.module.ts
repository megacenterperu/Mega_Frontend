import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { NavbarVerticalToggleDirective } from './directives/navbar-vertical-toggle.directive';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NavigationModule } from '../../shared/components/navigation/navigation.module';
import { SearchBarModule } from '../../shared/components/search-bar/search-bar.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    NavigationModule,
    SearchBarModule
  ],
  declarations: [
    ToolbarComponent,
    NavbarComponent,
    FooterComponent,
    ContentComponent,
    NavbarVerticalToggleDirective
  ],
  exports: [
    NavigationModule,
    NavbarVerticalToggleDirective,
    ToolbarComponent,
    NavbarComponent,
    FooterComponent,
    ContentComponent
  ]
})
export class LayoutModule { }
