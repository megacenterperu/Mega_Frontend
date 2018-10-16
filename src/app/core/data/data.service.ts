import { PersonalService } from "./personal.service";
import { TipoComprobanteService } from "./tipocomprobante.service";

import { PersonaService } from "./../data/persona.service";
import { Injectable } from "@angular/core";
import { ProveedorService } from "./proveedor.service";
import { CompraService } from "./compra.service";
import { TipoproductoService } from "./tipoproducto.service";
import { TipodocumentoService } from "./tipodocumento.service";

import { ProviderService } from "../provider/provider.service";
import { CategoriaService } from "./categoria.service";
import { UnidadmedidaService } from "./unidadmedida.service";
import { ProductoService } from "./producto.service";
import { OrganizacionService } from "./organizacion.service";
import { ClienteService } from "./cliente.service";
import { SucursalService } from "./sucursal.service";
import { ProformaService } from "./proforma.service";

@Injectable({
  providedIn: "root"
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
    private producto: ProductoService,
    private organizacion: OrganizacionService,
    private cliente: ClienteService,
    private sucursal: SucursalService,
    private proforma: ProformaService,
    private personal: PersonalService,
    private tipocomprobante: TipoComprobanteService
  ) {}
  providers(): ProviderService {
    return this.provider;
  }

  proveedores(): ProveedorService {
    return this.proveedor;
  }

  compras(): CompraService {
    return this.compra;
  }

  tipoProductos(): TipoproductoService {
    return this.tipoproducto;
  }

  tipoDocumentos(): TipodocumentoService {
    return this.tipodocumento;
  }

  personas(): PersonaService {
    return this.persona;
  }

  categorias(): CategoriaService {
    return this.categoria;
  }

  unidadMedidas(): UnidadmedidaService {
    return this.unidadmedida;
  }

  productos(): ProductoService {
    return this.producto;
  }

  organizaciones(): OrganizacionService {
    return this.organizacion;
  }

  clientes(): ClienteService {
    return this.cliente;
  }

  sucursales(): SucursalService {
    return this.sucursal;
  }
  tipocomprobantes(): TipoComprobanteService {
    return this.tipocomprobante;
  }

  proformas(): ProformaService {
    return this.proforma;
  }

  personales(): PersonalService {
    return this.personal;
  }
}
