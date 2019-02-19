import { TOKEN_NAME } from './../../../config/auth.config';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PerfilService } from '../data/perfil.service';
import { DataService } from '../data/data.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private dataService:DataService, private perfilService: PerfilService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let rpta=this.dataService.logins().estaLogeado();
        console.log("estadoLogin: "+rpta)
        if(!rpta){
            sessionStorage.clear();
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }
        if (sessionStorage.getItem(TOKEN_NAME)) {
            return true;
        }

    }
}