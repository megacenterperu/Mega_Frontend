import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'ms-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  collapsed: boolean;
  toolbarColor: string;
  @Output() onInput: EventEmitter<any> = new EventEmitter();
  onSettingsChanged: Subscription;

  constructor(private config: ConfigService) {
    this.collapsed = true;
    this.onSettingsChanged =
      this.config.onSettingsChanged.subscribe((newSettings) => {
        this.toolbarColor = newSettings.colorClasses.toolbar;
      });
  }

  ngOnInit() {

  }

  collapse() {
    this.collapsed = true;
  }

  expand() {
    this.collapsed = false;
  }

  search(event) {
    const value = event.target.value;

    this.onInput.emit(value);
  }

}
