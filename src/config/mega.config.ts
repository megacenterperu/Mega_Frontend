import { HOST, MICRO } from './auth.config';
import { Injectable } from "@angular/core";

@Injectable()
export class Configuration {
  
  public api = `${HOST}${MICRO}`;

}
