import { Animations } from './../../../shared/utils/animations';
import { TOKEN_NAME } from './../../../../config/auth.config';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/data/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as decode from 'jwt-decode';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations : Animations
})
export class LoginComponent implements OnInit {
  hide = true; 
  mensaje: string = "";
  error: string = "";

  loginForm: FormGroup;

  constructor(
    private dataService:DataService,
    private router: Router,
    private snackBar:MatSnackBar,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) { }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usuario   : ['', [Validators.required]],
      clave: ['', Validators.required]
  });
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, "Mensaje", { duration: 3000 });
    });
  }

  iniciarSesion() {
    this.dataService.logins().login(this.loginForm.value.usuario, this.loginForm.value.clave).subscribe(data =>{
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
            this.router.navigate(['/ventas/venta']);
            break;
          } else {
            this.router.navigate(['/ventas/personal']);
            break;
          }
        }

      }
    },
    error => {
      this.dataService.providers().mensaje.next('Operacion Incorrecta')
    });
  }
}
