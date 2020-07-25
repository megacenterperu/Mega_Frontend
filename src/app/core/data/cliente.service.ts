import { USER_DATA } from 'src/config/auth.config';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';
const basePath = "clientes";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private generic: GenericService) { }

  getAll(): Observable<any> {
    return this.generic.all(basePath).get();
  }

  findByIdSucursal(data:any): Observable<any>{
    return this.generic.all(basePath).all("listarCliente").all(data).get();
  }

  getAllfindByIdSucursal(): Observable<any>{
    const user = JSON.parse(sessionStorage.getItem(USER_DATA));
    return this.generic.all(basePath).all("listarCliente").all(user.idSucursal).get();
  }
  
  getRuc(numeroruc: string): Observable<any> {
    return this.generic.getRuc(numeroruc);
  }

  getDni(numerodni: string): Observable<any> {
    return this.generic.getDni(numerodni);
  }

  getAllPageable(p: number, s: number): Observable<any> {
    return this.generic.all(basePath).all(`pageable?page=${p}&size=${s}`).get();
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
