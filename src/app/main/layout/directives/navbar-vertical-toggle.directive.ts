import { Directive, HostListener, Input } from '@angular/core';
import { NavbarService } from '../../../shared/services/navbar.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Directive({
  selector: '[megaNavbar]'
})
export class NavbarVerticalToggleDirective {
  @Input() megaNavbar: string;
  navbar: NavbarComponent;

  constructor(private navbarService: NavbarService) {
  }

  @HostListener('click')
  onClick() {
    this.navbar = this.navbarService.getNavBar();

    if (!this.navbar[this.megaNavbar]) {
      return;
    }

    this.navbar[this.megaNavbar]();
  }
}
