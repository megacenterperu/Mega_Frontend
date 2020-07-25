import { USER_DATA, TOKEN_NAME } from 'src/config/auth.config';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
const basePath = "compras";
@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private generic: GenericService) { }

  getAll(): Observable<any> {
    return this.generic.all(basePath).get();
  }

  getAllfindByIdSucursal(): Observable<any>{
    const user = JSON.parse(sessionStorage.getItem(USER_DATA));
    return this.generic.all(basePath).all("list-compra").all(user.idSucursal).get();
  }

  listarCompraProductoMes(data:any): Observable<any>{
    const user = JSON.parse(sessionStorage.getItem(USER_DATA));
    data.idSucursal=user.idSucursal;
    return this.generic.all(basePath).all("listarCompraProductosMes").post(data);

  }
  
  getAllDetalle(id: number): Observable<any> {
    return this.generic.all(basePath).one("compra-detalle", id).get();
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
    return this.generic.all(basePath).all("registrar").post(data);
  }

  update(data: any): Observable<any> {
    const user = JSON.parse(sessionStorage.getItem(USER_DATA));
    data.idRegUsuaModifica=user.idUsuario;
    return this.generic.all(basePath).all("actualizar").put(data);
  }

  delete(id: number): Observable<any> {
    return this.generic.all(basePath).one("eliminar", id).delete();
  }

  reportCompraProductoMes(data:any): Observable<any>{
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    const movimiento = this.generic.all(basePath).all("reporte-producto-comprado-mes");
    return movimiento.http.post(movimiento.path,data, {
      responseType: 'blob',
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
  
}
