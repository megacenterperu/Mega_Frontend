import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [  
    { path: '', redirectTo: 'venta', pathMatch: 'full' },   
    { path: 'persona', loadChildren: '../../main/pages/persona/persona.module#PersonaModule'  },
    { path: 'proveedor', loadChildren: '../../main/pages/proveedor/proveedor.module#ProveedorModule' },
    { path: 'compra', loadChildren: '../../main/pages/compra/compra.module#CompraModule' },
    { path: 'tipo', loadChildren: '../../main/pages/tipo-genericos/tipo-genericos.module#TipoGenericosModule' },
    { path: 'rproducto', loadChildren: '../../main/pages/registro-producto/registro-producto.module#RegistroProductoModule' },
    { path: 'cliente', loadChildren: '../../main/pages/cliente/cliente.module#ClienteModule' },
    { path: 'organizacion', loadChildren: '../../main/pages/organizacion/organizacion.module#OrganizacionModule' },    
    { path: 'proforma', loadChildren: '../../main/pages/proforma/proforma.module#ProformaModule' },
    { path: 'personal', loadChildren: '../../main/pages/personal/personal.module#PersonalModule' },
    { path: 'venta', loadChildren: '../../main/pages/venta/venta.module#VentaModule'},
    { path: 'ventadirecta', loadChildren: '../../main/pages/venta-directa/venta-directa.module#VentaDirectaModule'},
    { path: 'reportes', loadChildren: '../../main/pages/reportes/reportes.module#ReportesModule' },
    { path: 'admincaja', loadChildren: '../../main/pages/administrar-caja/administrar-caja.module#AdministrarCajaModule' },
    { path: 'usuario', loadChildren: '../../main/pages/login-usuario/login-usuario.module#LoginUsuarioModule' },
    { path: 'consulta', loadChildren: '../../main/pages/consulta/consulta.module#ConsultaModule' },
    { path: 'menu', loadChildren: '../../main/pages/menu-rol/menu-rol.module#MenuRolModule' },
    { path: 'listUsuarioAdmin', loadChildren: '../../main/pages/usuario-admin/usuario-admin.module#UsuarioAdminModule' },
    { path: 'listpersonaladmin', loadChildren: '../../main/pages/personal-admin/personal-admin.module#PersonalAdminModule' },
    { path: 'guia', loadChildren: '../../main/pages/guia-remision/guia-remision.module#GuiaRemisionModule' },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }