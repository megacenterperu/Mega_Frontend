import { Injectable } from '@angular/core';
import { ProveedorService } from './proveedor.service';
import { CompraService } from './compra.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private proveedor: ProveedorService,
    private compra: CompraService
  ) { }

  proveedores(): ProveedorService {
    return this.proveedor;
  }

  compras(): CompraService {
    return this.compra;
  }
}
