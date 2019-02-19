import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/core/data/data.service";
import { LoginService } from "src/app/core/data/login.service";
import { Router } from "@angular/router";

@Component({
  selector: "ms-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {
  showLoadingBar: boolean;

  userName;
  userRoles: any[] = [];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    //const resp= this.loginService.estaLogeado();
    this.dataService.perfiles().perfilCambio.subscribe(response => {
      this.userName = response.usuario;
      this.userRoles = response.roles;
    });
    console.log(this.userName);
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
