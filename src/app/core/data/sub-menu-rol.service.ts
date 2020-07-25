import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';
const basePath = "subMenus";

@Injectable({
  providedIn: 'root'
})
export class SubMenuRolService {

  constructor(private generic:GenericService) { }

  create(data: any): Observable<any> {
    return this.generic.all(basePath).all("rol").post(data);
  }
  
}
