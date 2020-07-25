import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { USER_DATA } from 'src/config/auth.config';

const basePath = "tipoProductos";

@Injectable({
  providedIn: 'root'
})
export class TipoproductoService {

  constructor(private generic: GenericService) { }

  getAll(): Observable<any> {
    return this.generic.all(basePath).get();
  }

  getAllfindByIdSucursal(): Observable<any>{
    const user = JSON.parse(sessionStorage.getItem(USER_DATA));
    return this.generic.all(basePath).all("list-tipoproducto").all(user.idSucursal).get();
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

}
