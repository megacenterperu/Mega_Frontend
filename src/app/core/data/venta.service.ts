import { TOKEN_NAME } from './../../../config/auth.config';
import { Observable } from 'rxjs';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
const basePath = "ventas";
@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private generic: GenericService) { }

  getAll(): Observable<any> {
    return this.generic.all(basePath).get();
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

  getNumero(): Observable<any> {
    return this.generic.all(basePath).all("numero-Comprobante").get();
  }

  pdf(id) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    const proforma = this.generic.all(basePath).one("reporte-venta", id);
    return proforma.http.get(proforma.path, {
      responseType: 'blob',
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  buscarVentaFecha(data:any): Observable<any>{
    return this.generic.all(basePath).all("buscar-venta-fecha").post(data);

  }
}