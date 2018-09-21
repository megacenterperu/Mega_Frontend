import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  navBarRef;

  constructor() {
  }

  setNavBar(ref) {
    this.navBarRef = ref;
  }

  getNavBar() {
    return this.navBarRef;
  }
}
