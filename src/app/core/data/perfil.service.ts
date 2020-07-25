import { TOKEN_NAME, HOST, MICRO } from './../../../config/auth.config';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Perfil } from '../model/Perfil';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
const basePath = "usuarios";
@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  perfilCambio = new Subject<Perfil>();
  
  constructor(private generic:GenericService,private http: HttpClient) { }

  buscar() {    
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post<Perfil>(`${HOST}${MICRO}/${basePath}/user`, {}, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  /*buscar(data:any): Observable<any>{
    return this.generic.all(basePath).all("user").post(data);
  }*/
}
