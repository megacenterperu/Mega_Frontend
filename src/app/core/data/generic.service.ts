import { TOKEN_NAME } from './../../../config/auth.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Configuration } from '../../../config/mega.config';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  private url: string;
  private urlcom: string;

  constructor(private _http: HttpClient, private configuration: Configuration) {
    this.url = configuration.api; 
    this.urlcom = 'http://searchpe.herokuapp.com/public/api';
  }
  
  getAccessToken(): HttpHeaders {   
    const token = JSON.parse(sessionStorage.getItem(TOKEN_NAME))
    if(token){      
    return new HttpHeaders().set("Authorization", `bearer ${token.access_token}`).set("Content-Type", "application/json");
    }
      return  new HttpHeaders().set("Content-Type", "application/json");
  }  
  get path() {
    return this.url;
  }

  get http() {
    return this._http;
  }

  one(path: string, id: number): GenericService {
    const restangular = this.clone();
    restangular.url += (path ? '/' + path : '') + '/' + id;
    return restangular;
  }

  getRuc(numeroruc: string) {
    return this.http.get(`${this.urlcom}/ruc/${numeroruc}?token=wolsnut4`, {
      headers: this.getAccessToken()
    });
  }

  getDni(numerodni: string) {
    return this.http.get(`${this.urlcom}/dni/${numerodni}?token=wolsnut4`, {
      headers: this.getAccessToken()
    });
  }

  all(path: string): GenericService {
    const restangular = this.clone();
    restangular.url = restangular.url + '/' + path;
    return restangular;
  }

  get(): Observable<Response> {
    return this._http.get(this.url, { headers: this.getAccessToken() }).pipe(
      map((response) => {
        return response as any;
      }), catchError((res) => { return this.onError(res); }));
  }

  post(obj?: any): Observable<Response> {
    return this._http.post(this.url, obj, { headers: this.getAccessToken() }).pipe(
      map((response) => {
        return response as any;
      }), catchError((res) => { return this.onError(res); }));
  }

  put(obj: any): Observable<Response> {
    const clone = Object.assign({}, obj);
    delete clone['_restangular'];
    return this._http.put(this.url, clone, { headers: this.getAccessToken() }).pipe(
      map((response) => {
        return response as any;
      }), catchError((res) => { return this.onError(res); }));
  }

  delete(): Observable<Response> {
    return this._http.delete(this.url, { headers: this.getAccessToken() }).pipe(
      map((response) => {
        return response as any;
      }),
      catchError((res) => { return this.onError(res); }));
  }

  clone(): GenericService {
    return new GenericService(this._http, {api: this.url});
  }

  onError(error: any) {
    return throwError(error.message || error);
  }
}
