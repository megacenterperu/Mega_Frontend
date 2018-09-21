import { Component } from '@angular/core';
import { SplashScreenService } from './shared/services/splash-screen.service';
@Component({
  selector: 'ms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private splashScreen: SplashScreenService) {
  }
}
