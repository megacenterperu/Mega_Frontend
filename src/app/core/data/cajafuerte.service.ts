import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';
const basePath = "cajaFuertes";

@Injectable({
  providedIn: 'root'
})
export class CajafuerteService {

  constructor(private generic:GenericService) { }

    getAll(): Observable<any> {
    return this.generic.all(basePath).get();
     //return this.generic.all(basePath).all("listar").get();
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

    buscar(data:any): Observable<any>{
      return this.generic.all(basePath).all("buscar").post(data);
    }
}
