import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CookieService } from 'ngx-cookie-service';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from './pipes/pipes.module';
import { NavbarService } from './services/navbar.service';
import { PerfectScrollbarDirective } from './directives/perfect-scrollbar.directive';
import { MatchMediaService } from './services/match-media.service';

@NgModule({
    declarations: [
        PerfectScrollbarDirective,
    ],
    imports: [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        PipesModule,
        ReactiveFormsModule,
        CoreModule
    ],
    exports: [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        PipesModule,
        PerfectScrollbarDirective,
        ReactiveFormsModule
    ],
    entryComponents: [
    ],
    providers: [
        CookieService,
        MatchMediaService,
        NavbarService
    ]
})
export class SharedModule { }
