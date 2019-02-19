import { HttpClient, HttpHeaders } from "@angular/common/http";
import {TOKEN_AUTH_PASSWORD,TOKEN_AUTH_USERNAME,AUTH_TOKEN,HOST, TOKEN_NAME, MICRO} from "./../../../config/auth.config";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class LoginService {  

  constructor(private http: HttpClient,private router: Router) {}

  login(username: string, password: string): Observable<any> {
    const body = `grant_type=password&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
   
    return this.http.post(`${HOST}${AUTH_TOKEN}`, body, { 
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').set('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD))
     });
  } 

  estaLogeado() {
    let token = sessionStorage.getItem(TOKEN_NAME);
    return token != null;
  }

  getAccessToken(): HttpHeaders {   
    const token = JSON.parse(sessionStorage.getItem(TOKEN_NAME))
    if(token){
      return new HttpHeaders().set("Authorization", `bearer ${token.access_token}`).set("Content-Type", "application/json");
    }
    return  new HttpHeaders().set("Content-Type", "application/json");
  }

  cerrarSesion() {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get(`${HOST}${MICRO}/usuarios/anular/${access_token}`,{ headers: this.getAccessToken() });
  }

  verificarTokenReset(token: string) {
    return this.http.get<number>(`${HOST}${MICRO}/login/restablecer/verificar/${token}`);
  }
  
}
