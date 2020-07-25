import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';
const basePath = "tipotransportes";

@Injectable({
  providedIn: 'root'
})
export class TipotransporteService {

  constructor(private generic:GenericService) { }

  getAll(): Observable<any> {
    return this.generic.all(basePath).get();
  }
  
}
