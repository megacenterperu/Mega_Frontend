
import { PersonaService } from './../data/persona.service';
import { Injectable } from '@angular/core';
import { ProveedorService } from './proveedor.service';
import { CompraService } from './compra.service';
import { ProviderService } from '../provider/provider.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private proveedor: ProveedorService,
    private compra: CompraService,
    private persona: PersonaService,
    private provider: ProviderService
  ) { }

  providers(): ProviderService {
    return this.provider;
  }

  proveedores(): ProveedorService {
    return this.proveedor;
  }

  compras(): CompraService {
    return this.compra;
  }
  personas(): PersonaService {
    return this.persona;
  }


}
