import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Animations } from '../../../shared/utils/animations';
import { ConfigService } from '../../../shared/services/config.service';

@Component({
  selector: 'ms-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  animations: Animations
})
export class ContentComponent implements OnInit, OnDestroy {
  onSettingsChanged: Subscription;
  megaSettings: any;

  @HostBinding('@routerTransitionUp') routeAnimationUp = false;
  @HostBinding('@routerTransitionDown') routeAnimationDown = false;
  @HostBinding('@routerTransitionRight') routeAnimationRight = false;
  @HostBinding('@routerTransitionLeft') routeAnimationLeft = false;
  @HostBinding('@routerTransitionFade') routeAnimationFade = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private config: ConfigService
  ) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute)
    ).subscribe((event) => {
      switch (this.megaSettings.routerAnimation) {
        case 'fadeIn':
          this.routeAnimationFade = !this.routeAnimationFade;
          break;
        case 'slideUp':
          this.routeAnimationUp = !this.routeAnimationUp;
          break;
        case 'slideDown':
          this.routeAnimationDown = !this.routeAnimationDown;
          break;
        case 'slideRight':
          this.routeAnimationRight = !this.routeAnimationRight;
          break;
        case 'slideLeft':
          this.routeAnimationLeft = !this.routeAnimationLeft;
          break;
      }
    });

    this.onSettingsChanged =
      this.config.onSettingsChanged.subscribe((newSettings) => {
        this.megaSettings = newSettings;
      });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.onSettingsChanged.unsubscribe();
  }
}
