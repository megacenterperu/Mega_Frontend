import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpHeaders } from "@angular/common/http";
import { saveAs } from "file-saver";
const basePath = "proformas";

@Injectable({
  providedIn: "root"
})
export class ProformaService {
  constructor(private generic: GenericService) {}

  getAll(): Observable<any> {
    return this.generic.all(basePath).get();
  }

  getNumero(): Observable<any> {
    return this.generic.all(basePath).all("numero-proforma").get();
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

  generarReporte(){
    const proforma = this.generic.all(basePath).all("generarReporte");
    return proforma.http.get(proforma.path,{
      responseType: 'blob',
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  generarReporteImprimir(){
    const proforma = this.generic.all(basePath).all("generarReporteImprimir");
    return proforma.http.get(proforma.path,{
      responseType: 'blob',
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  descargarReporte() {
    const cliente = this.generic.all(basePath).all("generarReporte");
    cliente.http.get(cliente.path, { headers: new HttpHeaders(), responseType: "blob" })
      .pipe(map(response => {
          const file = {file: response,fileName: "Archivo.pdf"};
          return file;
        })
      ).subscribe(result => {
          saveAs(result.file, result.fileName);
        },
        error => {
          console.log("error downloading file");
        }
      );  
  }

}
