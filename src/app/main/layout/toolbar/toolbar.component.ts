import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/core/data/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "ms-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {
  showLoadingBar: boolean;

  menus: any[] = [];
  userName;
  userRoles: any[] = [];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    /*this.dataService.menus().menuCambio.subscribe(data => {
      this.menus = data;
      //console.log(data);
    });*/
    this.dataService.perfiles().perfilCambio.subscribe(response => {
      this.userName = response.usuario;
      this.userRoles = response.roles;
    });
    const d= this.dataService.logins().getUserData();
    if(d){
     this.userName = d.usuario;
     this.userRoles = d.roles;
    } 
  }

  cerrarSesion() {
    this.dataService.logins().cerrarSesion().subscribe(d => {
      sessionStorage.clear();
      this.router.navigate(['/login']);
    });
  }

  estaLogeado() {
    return this.dataService.logins().estaLogeado();
  }
  search(value) {
    console.log(value);
  }
}
