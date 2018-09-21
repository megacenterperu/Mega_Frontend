import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private generic: GenericService) { }

  getAll(): Observable<any> {
    return this.generic.all("listar").get();
  }

  getAllPageable(p: number, s: number): Observable<any> {
    return this.generic.all(`pageable?page=${p}&size=${s}`).get();
  }

  findById(id: number): Observable<any> {
    return this.generic.one("", id).get();
  }

  create(data: any): Observable<any> {
    return this.generic.all("").post(data);
  }

  update(data: any): Observable<any> {
    return this.generic.all("").put(data);
  }

  delete(id: number): Observable<any> {
    return this.generic.one("", id).delete();
  }
}
