import { USER_DATA, TOKEN_NAME } from 'src/config/auth.config';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
const basePath = "productos";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private generic:GenericService) { }

  getAll(): Observable<any> {
    return this.generic.all(basePath).get();
  }

  getAllfindByIdSucursal(): Observable<any>{
    const user = JSON.parse(sessionStorage.getItem(USER_DATA));
    return this.generic.all(basePath).all("listProducto").all(user.idSucursal).get();
  }

  getAllExcel() {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    const user = JSON.parse(sessionStorage.getItem(USER_DATA));
    const excel = this.generic.all(basePath).all("excel").all(user.idSucursal);
    return excel.http.get(excel.path, {
      responseType: 'blob',
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  findByIdSucursal(data:any): Observable<any>{
    return this.generic.all(basePath).all("idSucursal").post(data);
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

  findProductoByCodProducto(data:any): Observable<any>{
    const user = JSON.parse(sessionStorage.getItem(USER_DATA));
    return this.generic.all(basePath).all("buscar").all(user.idSucursal).all(data).get();

    //return this.generic.all(basePath).all("buscar").post(data);
  }

  listPrecioProductoAlamacen(data:any): Observable<any>{
    return this.generic.all(basePath).all("listPrecioProductoAlamacen").post(data);

  }
  
}
