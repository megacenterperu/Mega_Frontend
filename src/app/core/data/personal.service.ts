import { USER_DATA } from 'src/config/auth.config';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';
const basePath = "personales";

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  constructor(private generic: GenericService) { }

  getAll(): Observable<any> {
    return this.generic.all(basePath).get();
  }

  findByIdSucursal(data:any): Observable<any>{
    return this.generic.all(basePath).all("listarPersonal").all(data).get();
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
