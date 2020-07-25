import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { GenericService } from './generic.service';
const basePath = "subMenus";

@Injectable({
  providedIn: 'root'
})
export class SubMenuService {

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
