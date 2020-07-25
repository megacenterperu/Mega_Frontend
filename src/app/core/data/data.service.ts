import { UsuarioService } from './usuario.service';
import { CajaService } from './caja.service';
import { TipopagoService } from './tipopago.service';
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
import { VentaService } from "./venta.service";
import { EgresoService } from './egreso.service';
import { CajafuerteService } from './cajafuerte.service';
import { RolService } from './rol.service';
import { LoginService } from './login.service';
import { PerfilService } from './perfil.service';
import { UsuarioRolService } from './usuario-rol.service';
import { AnularcomprobanteService } from './anularcomprobante.service';
import { MenuRolService } from './menu-rol.service';
import { MenuService } from './menu.service';
import { SubMenuService } from './sub-menu.service';
import { SubMenuRolService } from './sub-menu-rol.service';
import { GuiaremisionService } from './guiaremision.service';
import { MotivotrasladoService } from './motivotraslado.service';
import { TipotransporteService } from './tipotransporte.service';
import { TipoafectacionService } from './tipoafectacion.service';

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
    private dolenciaproducto: CategoriaService,
    private unidadmedida: UnidadmedidaService,
    private producto: ProductoService,
    private organizacion: OrganizacionService,
    private cliente: ClienteService,
    private sucursal: SucursalService,
    private proforma: ProformaService,
    private personal: PersonalService,
    private tipocomprobante: TipoComprobanteService,
    private venta: VentaService,
    private tipopago: TipopagoService,
    private egreso: EgresoService,
    private caja: CajaService,
    private cajafuerte: CajafuerteService,
    private usuario: UsuarioService,
    private rol: RolService,
    private login: LoginService,
    private perfil: PerfilService,
    private usuariorol: UsuarioRolService,
    private anularcomprobante: AnularcomprobanteService,
    private menu: MenuService,
    private menurol: MenuRolService,
    private submenu: SubMenuService,
    private submenurol: SubMenuRolService,
    private guia: GuiaremisionService,
    private motivotraslado: MotivotrasladoService,
    private tipotransporte: TipotransporteService,
    private tipoafectacion: TipoafectacionService


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

  tipoProductos(): TipoproductoService {
    return this.tipoproducto;
  }

  tipoDocumentos(): TipodocumentoService {
    return this.tipodocumento;
  }

  personas(): PersonaService {
    return this.persona;
  }

  dolenciaProductos(): CategoriaService {
    return this.dolenciaproducto;
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
  tipopagos(): TipopagoService {
    return this.tipopago;
  }

  proformas(): ProformaService {
    return this.proforma;
  }

  personales(): PersonalService {
    return this.personal;
  }

  ventas(): VentaService {
    return this.venta;
  }

  egresos(): EgresoService {
    return this.egreso;
  }

  cajas(): CajaService {
    return this.caja;
  }

  cajaFuertes(): CajafuerteService {
    return this.cajafuerte;
  }

  usuarios(): UsuarioService {
    return this.usuario;
  }

  usuarioroles(): UsuarioRolService {
    return this.usuariorol;
  }

  roles(): RolService {
    return this.rol;
  }

  logins(): LoginService {
    return this.login;
  }

  perfiles(): PerfilService {
    return this.perfil;
  }

  anularComprobantes(): AnularcomprobanteService {
    return this.anularcomprobante;
  }

  menus(): MenuService {
    return this.menu;
  }

  menuroles(): MenuRolService {
    return this.menurol;
  }

  subMenus(): SubMenuService {
    return this.submenu;
  }
  submenuroles(): SubMenuRolService {
    return this.submenurol;
  }

  guias(): GuiaremisionService {
    return this.guia;
  }

  motivotrastados(): MotivotrasladoService {
    return this.motivotraslado;
  }

  tipotransportes(): TipotransporteService {
    return this.tipotransporte;
  }

  tipoAfectaciones(): TipoafectacionService {
    return this.tipoafectacion;
  }
}
