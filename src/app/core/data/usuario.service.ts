import { USER_DATA } from 'src/config/auth.config';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
const basePath = "usuarios";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioCambio = new Subject<any[]>();
  mensaje = new Subject<string>();

  constructor(private generic:GenericService) { }

  getAll(): Observable<any> {
    return this.generic.all(basePath).get();
  }

  getAllPageable(p: number, s: number): Observable<any> {
    return this.generic.all(basePath).all(`pageable?page=${p}&size=${s}`).get();
  }

  findByIdSucursal(data:any): Observable<any>{
    return this.generic.all(basePath).all("list-user").all(data).get();
  }

  findById(id: number): Observable<any> {
    return this.generic.one(basePath, id).get();
  }

  hasEditPermision(id: number): Observable<any> {
    return this.generic.all(basePath).one("has-edit-permision", id).get();
  }

  create(data: any): Observable<any> {
    const user = JSON.parse(sessionStorage.getItem(USER_DATA));
    data.idSucursal=user.idSucursal;
    return this.generic.all(basePath).all("registrar").post(data);
  }

  update(data: any): Observable<any> {
    return this.generic.all(basePath).all("actualizar").put(data);
  }

  delete(id: number): Observable<any> {
    return this.generic.all(basePath).one("eliminar", id).delete();
  }


}
