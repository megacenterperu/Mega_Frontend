import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';
const basePath = "tipoAfectaciones";

@Injectable({
  providedIn: 'root'
})
export class TipoafectacionService {

  constructor(private generic: GenericService) { }

  getAll(): Observable<any> {
    return this.generic.all(basePath).get();
  }

  findById(id: number): Observable<any> {
    return this.generic.one(basePath, id).get();
  }
}
