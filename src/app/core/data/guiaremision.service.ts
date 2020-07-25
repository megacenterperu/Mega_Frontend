import { USER_DATA, TOKEN_NAME } from 'src/config/auth.config';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
const basePath = "guias";

@Injectable({
  providedIn: 'root'
})
export class GuiaremisionService {

  constructor(private generic: GenericService) { }

  getAll(): Observable<any> {
    return this.generic.all(basePath).get();
  }

  /*findByIdSucursal(data:any): Observable<any>{
    return this.generic.all(basePath).all("list-venta").all(data).get();
  }*/

  getAllfindByIdSucursal(): Observable<any>{
    const user = JSON.parse(sessionStorage.getItem(USER_DATA));
    return this.generic.all(basePath).all("list-guia").all(user.idSucursal).get();
  }

  getAllDetalle(id: number): Observable<any> {
    return this.generic.all(basePath).one("guia-detalle", id).get();
  }

  getAllPageable(p: number, s: number): Observable<any> {
    return this.generic.all(basePath).all(`pageable?page=${p}&size=${s}`).get();
  }

  findById(id: number): Observable<any> {
    return this.generic.one(basePath, id).get();
  }

  create(data: any): Observable<any> {
    const user = JSON.parse(sessionStorage.getItem(USER_DATA));
    data.idRegUsuaRegistra=user.idUsuario;
    data.idSucursal=user.idSucursal;
    return this.generic.all(basePath).all("registrar").post(data);
  }

  update(data: any): Observable<any> {
    const user = JSON.parse(sessionStorage.getItem(USER_DATA));
    data.idRegUsuaModifica=user.idUsuario;
    data.idSucursal=user.idSucursal;
    return this.generic.all(basePath).all("actualizar").put(data);
  }

  delete(id: number): Observable<any> {
    return this.generic.all(basePath).one("eliminar", id).delete();
  }

  pdfGuia(id) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    const guiaRemision = this.generic.all(basePath).one("reporte-guia", id);
    return guiaRemision.http.get(guiaRemision.path, {
      responseType: 'blob',
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
  
}
