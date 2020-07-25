import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';
const basePath = "menus";

@Injectable({
  providedIn: 'root'
})
export class MenuRolService {

  constructor(private generic:GenericService) { }

  create(data: any): Observable<any> {
    return this.generic.all(basePath).all("rol").post(data);
  }
}
