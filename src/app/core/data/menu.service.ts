import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { GenericService } from './generic.service';
const basePath = "menus";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuCambio = new Subject<any[]>();
  menuEdicionCambio = new Subject<any[]>();
  mensaje = new Subject<string>();

  constructor(private generic:GenericService) { }

  getAll(): Observable<any> {
    return this.generic.all(basePath).get();
  }

  getAllPageable(p: number, s: number): Observable<any> {
    return this.generic.all(basePath).all(`pageable?page=${p}&size=${s}`).get();
  }

  getAllSubMenu(id: number): Observable<any> {
    return this.generic.all(basePath).one("menu-submenu", id).get();
  }
  
  /*listarPorUsuario(nombre: string) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post<Menu[]>(`${this.url}/usuario`, nombre, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }*/

  listarPorUsuario(data:any): Observable<any>{
    return this.generic.all(basePath).all("usuario").post(data);
  }

  findById(id: number): Observable<any> {
    return this.generic.one(basePath, id).get();
  }

  create(data: any): Observable<any> {
    return this.generic.all(basePath).all("registrar").post(data);
  }

  update(data: any): Observable<any> {
    return this.generic.all(basePath).all("actualizar").put(data);
  }

  delete(id: number): Observable<any> {
    return this.generic.all(basePath).one("eliminar", id).delete();
  }
  
}
