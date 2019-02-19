import { TOKEN_NAME } from './../../../../../config/auth.config';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/data/data.service';
import { Router } from '@angular/router';
import * as decode from 'jwt-decode';

@Component({
  selector: 'ms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  usuario: string;
  clave: string;
  mensaje: string = "";
  error: string = "";

  constructor(private dataService:DataService,private router: Router) { }

  ngOnInit() {
  }

  /*ngAfterViewInit() {
    (window as any).initialize();
  }*/

  iniciarSesion($event) {
    this.dataService.logins().login(this.usuario, this.clave).subscribe(data =>{
      console.log("DATOS: "+data);
      if (data) {
        let token = JSON.stringify(data);
        sessionStorage.setItem(TOKEN_NAME, token);

        let tk = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
        const decodedToken = decode(tk.access_token);
        console.log(decodedToken);
        /*this.menuService.listarPorUsuario(decodedToken.user_name).subscribe(data => {
          this.menuService.menuCambio.next(data);
        });*/
        this.dataService.perfiles().buscar().subscribe(response=>{
          this.dataService.perfiles().perfilCambio.next(response);
        });


        console.log(decodedToken.authorities);
        let roles = decodedToken.authorities;
        for (let i = 0; roles.length; i++) {
          let rol = roles[i];
          if (rol === 'USER') {
            //this.router.navigate([url], { queryParams: { page: $event } });
            this.router.navigate(['/ventas/venta'], { queryParams: { page: $event } });
            break;
          } else {
            this.router.navigate(['/ventas/personal']);
            break;
          }
        }

      }
    });
  }

}
