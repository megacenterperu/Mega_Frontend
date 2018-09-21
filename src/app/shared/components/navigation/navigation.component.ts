import { Component, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationService } from '../../services/navigation.service';


@Component({
    selector: 'ms-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnDestroy {

    navigationModel: any[];
    navigationModelChangeSubscription: Subscription;

    constructor(private navigationService: NavigationService) {
        this.navigationModelChangeSubscription =
            this.navigationService.onNavigationModelChange
                .subscribe((navigationModel) => {
                    this.navigationModel = navigationModel;
                    console.log(navigationModel);
                });
    }

    ngOnDestroy() {
        this.navigationModelChangeSubscription.unsubscribe();
    }

}
