import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//import { NavigationModel } from '../menu-items/navigation.model';
import { DataService } from 'src/app/core/data/data.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  menus: any[] = [];
  onNavCollapseToggle = new EventEmitter<any>();
  onNavCollapseToggled = new EventEmitter<any>();
  onNavigationModelChange: BehaviorSubject<any> = new BehaviorSubject({});
  navigationModel: any[] = [];
  flatNavigation: any[] = [];

  constructor(private dataService: DataService) {
   // this.navigationModel = new NavigationModel();
   
   /*const data= this.dataService.logins().getUserData();   
    this.dataService.menus().listarPorUsuario(data.usuario).subscribe(d=>{  
      this.navigationModel=d;
      this.onNavigationModelChange.next(d);
    });*/

    this.dataService.menus().menuCambio.subscribe(data => {
      this.menus = data;
      this.navigationModel= this.menus;
      this.onNavigationModelChange.next(this.menus);
    });
    const data= this.dataService.logins().getUserData();  
    if(data){
      this.dataService.menus().listarPorUsuario(data.usuario).subscribe(d=>{  
        this.navigationModel=d;
        this.onNavigationModelChange.next(d);
      })
    }
  }

  /**
   * Get navigation model
   *
   * @returns {any[]}
   */
  getNavigationModel() {
   // return this.navigationModel.model;
    return this.navigationModel;
  }

  /**
   * Set the navigation model
   *
   * @param model
   */
  setNavigationModel(model) {
    this.navigationModel = model;
    //this.onNavigationModelChange.next(this.navigationModel.model);
    this.onNavigationModelChange.next(this.navigationModel);
  }

  /**
   * Add new navigation item
   * to the given location
   */
  addNavigationItem(location, item) {
    // Parse the location
    const locationArr = location.split('.');

    if (locationArr.length === 0) {
      return;
    }

    // Find the navigation item
    const navItem = this.findNavigationItemById(locationArr);

    // Act according to the item type
    switch (navItem.type) {
      case 'item':

        // Create a children array
        navItem.children = [];

        // Push the item
        navItem.children.push(item);

        // Change the item type to collapsable
        navItem.type = 'collapse';

        break;

      case 'collapse':

        // Push the item
        navItem.children.push(item);

        break;

      case 'group':

        // Push the item
        navItem.children.push(item);

        break;

      default:
        break;
    }
  }

  /**
   * Get navigation item from
   * given location
   *
   * @param location
   */
  getNavigationItem(location) {
    // Parse the location
    const locationArr = location.split('.');

    if (locationArr.length === 0) {
      return;
    }

    // Find and return the navigation item
    return this.findNavigationItemById(locationArr);
  }

  /**
   * Find navigation item by location
   *
   * @param location
   * @param navigation
   */
  findNavigationItemById(location, navigation?) {
    if (!navigation) {
      navigation = this.navigationModel;
     // navigation = this.navigationModel.model;
    }

    // Iterate through the given navigation
    for (const navItem of navigation) {
      // If the nav item id equals the first location...
      if (navItem.id === location[0]) {
        // If there is more location to look at...
        if (location.length > 1) {
          // Remove the first item of the location
          location.splice(0, 1);

          // Go nested...
          return this.findNavigationItemById(location, navItem.children);
        }

        // Otherwise just return the nav item
        else {
          return navItem;
        }
      }
    }
  }

  /**
   * Get flattened navigation array
   * @param navigationItems
   * @returns {any[]}
   */
  getFlatNavigation(navigationItems?) {
    if (!navigationItems) {
     // navigationItems = this.navigationModel.model;
      navigationItems = this.navigationModel;
    }

    for (const navItem of navigationItems) {
      if (navItem.type === 'subheader') {
        continue;
      }

      if (navItem.type === 'item') {
        this.flatNavigation.push({
          title: navItem.title,
          type: navItem.type,
          icon: navItem.icon || false,
          url: navItem.url
        });

        continue;
      }

      if (navItem.type === 'collapse' || navItem.type === 'group') {
        this.getFlatNavigation(navItem.children);
      }
    }

    return this.flatNavigation;
  }
}
