import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import { SplashScreenService } from './shared/services/splash-screen.service';
import { ConfigService } from './shared/services/config.service';
import { NavigationService } from './shared/services/navigation.service';
import { SharedModule } from './shared/shared.module';
import { Configuration } from '../config/mega.config';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    MainModule
  ],
  providers: [
    SplashScreenService,
    ConfigService,
    NavigationService,
    Configuration
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
