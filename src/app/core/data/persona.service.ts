import { Observable } from 'rxjs';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
const  basePath= "personas"
@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private generic: GenericService) { }

  getAll(): Observable<any> {
    return this.generic.all(basePath).get();
  }

  getAllPageable(p: number, s: number): Observable<any> {
    return this.generic.all(basePath).all(`pageable?page=${p}&size=${s}`).get();
  }

  findById(id: number): Observable<any> {
    return this.generic.all(basePath).one("", id).get();
  }

  create(data: any): Observable<any> {
    return this.generic.all(basePath).all("").post(data);
  }

  update(data: any): Observable<any> {
    return this.generic.all(basePath).all("").put(data);
  }

  delete(id: number): Observable<any> {
    return this.generic.all(basePath).one("", id).delete();
  }

}
