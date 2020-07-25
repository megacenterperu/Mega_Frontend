import { USER_DATA, TOKEN_NAME } from 'src/config/auth.config';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
const basePath = "egresos";

@Injectable({
  providedIn: 'root'
})
export class EgresoService {

  constructor(private generic:GenericService) { }

  getAll(): Observable<any> {
    return this.generic.all(basePath).get();
     //return this.generic.all(basePath).all("listar").get();
    }

    findByIdSucursal(data:any): Observable<any>{
       return this.generic.all(basePath).all("idSucursalEgreso").post(data);
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
      data.idSucursal=user.idSucursal;
      return this.generic.all(basePath).all("registrar").post(data);
    }
  
    update(data: any): Observable<any> {
      const user = JSON.parse(sessionStorage.getItem(USER_DATA));
      data.idRegUsuaModifica=user.idUsuario;
      data.idSucursal=user.idSucursal;
      return this.generic.all(basePath).all("actualizar").put(data);
    }
  
    delete(id: number): Observable<any> {
      return this.generic.all(basePath).one("eliminar", id).delete();
    }

    buscar(data:any): Observable<any>{
      const user = JSON.parse(sessionStorage.getItem(USER_DATA));
      data.idSucursal=user.idSucursal;
      return this.generic.all(basePath).all("buscar").post(data);
    }

    buscarEgresoFechaConsulta(data:any): Observable<any>{
      const user = JSON.parse(sessionStorage.getItem(USER_DATA));
      data.idSucursal=user.idSucursal;
      return this.generic.all(basePath).all("buscar-egreso-fecha-consulta").post(data);
    }

    buscarEgresoFechaConsultaMes(data:any): Observable<any>{
      const user = JSON.parse(sessionStorage.getItem(USER_DATA));
      data.idSucursal=user.idSucursal;
      return this.generic.all(basePath).all("buscar-egreso-fecha-consulta-mes").post(data);
    }

    reportEgresoMes(data:any): Observable<any>{
      let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
      const egreso = this.generic.all(basePath).all("reporte-egreso-fecha-consulta-mes");
      return egreso.http.post(egreso.path,data, {
        responseType: 'blob',
        headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
      });
    }
    
}
