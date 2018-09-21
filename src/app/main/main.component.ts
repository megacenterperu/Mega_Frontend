import { Component, ElementRef, HostBinding, Inject, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { ConfigService } from '../shared/services/config.service';

@Component({
  selector: 'ms-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit, OnDestroy {
  onSettingsChanged: Subscription;
  megaSettings: any;
  @HostBinding('attr.ms-layout-mode') layoutMode;

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    private config: ConfigService,
    private platform: Platform,
    @Inject(DOCUMENT) private document: any
  ) {
    this.onSettingsChanged =
      this.config.onSettingsChanged
        .subscribe(
          (newSettings) => {
            this.megaSettings = newSettings;
            this.layoutMode = this.megaSettings.layout.mode;
          }
        );

    if (this.platform.ANDROID || this.platform.IOS) {
      this.document.body.className += ' is-mobile';
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.onSettingsChanged.unsubscribe();
  }

  addClass(className: string) {
    this._renderer.addClass(this._elementRef.nativeElement, className);
  }

  removeClass(className: string) {
    this._renderer.removeClass(this._elementRef.nativeElement, className);
  }
}
