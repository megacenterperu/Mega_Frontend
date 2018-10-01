import { Injectable } from '@angular/core';
import { ProveedorService } from './proveedor.service';
import { CompraService } from './compra.service';
import { TipoproductoService } from './tipoproducto.service';
import { TipodocumentoService } from './tipodocumento.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private proveedor: ProveedorService,
    private compra: CompraService,
    private tipoproducto: TipoproductoService,
    private tipodocumento: TipodocumentoService
  ) { }

  proveedores(): ProveedorService {
    return this.proveedor;
  }

  compras(): CompraService {
    return this.compra;
  }

  tipoProductos(): TipoproductoService{
    return this.tipoproducto;
  }

  tipoDocumentos():TipodocumentoService{
    return this.tipodocumento;
  }
}
