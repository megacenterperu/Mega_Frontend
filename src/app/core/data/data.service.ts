
import { PersonaService } from './../data/persona.service';
import { Injectable } from '@angular/core';
import { ProveedorService } from './proveedor.service';
import { CompraService } from './compra.service';
import { TipoproductoService } from './tipoproducto.service';
import { TipodocumentoService } from './tipodocumento.service';

import { ProviderService } from '../provider/provider.service';
import { CategoriaService } from './categoria.service';
import { UnidadmedidaService } from './unidadmedida.service';
import { ProductoService } from './producto.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private proveedor: ProveedorService,
    private compra: CompraService,

    private tipoproducto: TipoproductoService,
    private tipodocumento: TipodocumentoService,

    private persona: PersonaService,
    private provider: ProviderService,
    private categoria: CategoriaService,
    private unidadmedida: UnidadmedidaService,
    private producto:ProductoService

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

  tipoProductos(): TipoproductoService{
    return this.tipoproducto;
  }

  tipoDocumentos():TipodocumentoService{
    return this.tipodocumento;
  }

  personas(): PersonaService {
    return this.persona;
  }

  categorias(): CategoriaService{
    return this.categoria;
  }

  unidadMedidas(): UnidadmedidaService{
    return this.unidadmedida;
  }

  productos():ProductoService{
    return this.producto;
  }

}
