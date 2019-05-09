import { USER_DATA } from 'src/config/auth.config';
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

  getAllDetalle(id: number): Observable<any> {
    return this.generic.all(basePath).one("venta-detalle", id).get();
  }

  getAllPageable(p: number, s: number): Observable<any> {
    return this.generic.all(basePath).all(`pageable?page=${p}&size=${s}`).get();
  }

  findById(id: number): Observable<any> {
    return this.generic.one(basePath, id).get();
  }

  create(data: any): Observable<any> {
    const user = JSON.parse(sessionStorage.getItem(USER_DATA));
    data.idRegUsuaRegistra=user.idUsuario;
    return this.generic.all(basePath).all("registrar").post(data);
  }

  update(data: any): Observable<any> {
    const user = JSON.parse(sessionStorage.getItem(USER_DATA));
    data.idRegUsuaModifica=user.idUsuario;
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

  reportUtilidadMes(data:any): Observable<any>{
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    const movimiento = this.generic.all(basePath).all("reporte-utilidad-mes");
    return movimiento.http.post(movimiento.path,data, {
      responseType: 'blob',
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  buscarVentaFecha(data:any): Observable<any>{
    return this.generic.all(basePath).all("buscar-venta-fecha").post(data);
  }

  buscarVentaFechaPorAnular(data:any): Observable<any>{
    return this.generic.all(basePath).all("buscar-venta-fecha-anular").post(data);
  }

  listarUtilidad(data:any): Observable<any>{
    return this.generic.all(basePath).all("listarUtilidada").post(data);

  }

  listarUtilidadMes(data:any): Observable<any>{
    return this.generic.all(basePath).all("listarUtilidadMes").post(data);

  }

  listVentaPorUsuario(data:any): Observable<any>{
    return this.generic.all(basePath).all("listar-venta-usuario").post(data);

  }
}