import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  cambio = new Subject<any[]>();  
  mensaje = new Subject<string>();
  dialogo= new Subject<any>();
  constructor() { }
}
