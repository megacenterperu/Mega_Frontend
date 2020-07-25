import { USER_DATA } from 'src/config/auth.config';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const basePath = "dolenciaProductos";

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private generic:GenericService) { }

  getAll(): Observable<any> {
    return this.generic.all(basePath).get();
  }

  getAllfindByIdSucursal(): Observable<any>{
    const user = JSON.parse(sessionStorage.getItem(USER_DATA));
    return this.generic.all(basePath).all("list-colorproducto").all(user.idSucursal).get();
  }

  getAllPageable(p: number, s: number): Observable<any> {
    return this.generic.all(basePath).all(`pageable?page=${p}&size=${s}`).get();
  }

  findById(id: number): Observable<any> {
    return this.generic.one(basePath, id).get();
  }

  create(data: any): Observable<any> {
    const user = JSON.parse(sessionStorage.getItem(USER_DATA));
    data.idSucursal=user.idSucursal;
    return this.generic.all(basePath).all("registrar").post(data);
  }

  update(data: any): Observable<any> {
    const user = JSON.parse(sessionStorage.getItem(USER_DATA));
    data.idSucursal=user.idSucursal;
    return this.generic.all(basePath).all("actualizar").put(data);
  }

  delete(id: number): Observable<any> {
    return this.generic.all(basePath).one("eliminar", id).delete();
  }

}
