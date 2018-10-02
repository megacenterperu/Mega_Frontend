import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
const basePath = "tipoDocumentos";

@Injectable({
  providedIn: 'root'
})
export class TipodocumentoService {

  tipodocumentoCambio= new Subject<any[]>();

  mensaje= new Subject<string>();

  constructor(private generic:GenericService) { }

  getAll(): Observable<any> {
    return this.generic.all(basePath).all("listar").get();
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
