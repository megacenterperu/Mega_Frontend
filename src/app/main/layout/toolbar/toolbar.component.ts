import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ms-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  showLoadingBar: boolean;

  constructor() {
  }

  search(value) {
    console.log(value);
  }

}
