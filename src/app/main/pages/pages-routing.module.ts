import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [  
    { path: '', redirectTo: 'sample', pathMatch: 'full' },
    { path: 'persona', loadChildren: '../../main/pages/persona/persona.module#PersonaModule' },
    { path: 'proveedor', loadChildren: '../../main/pages/proveedor/proveedor.module#ProveedorModule' },
    { path: 'compra', loadChildren: '../../main/pages/compra/compra.module#CompraModule' },
    { path: 'tipo', loadChildren: '../../main/pages/tipo-genericos/tipo-genericos.module#TipoGenericosModule' },
    { path: 'rproducto', loadChildren: '../../main/pages/registro-producto/registro-producto.module#RegistroProductoModule' },
    { path: 'cliente', loadChildren: '../../main/pages/cliente/cliente.module#ClienteModule' },
    { path: 'organizacion', loadChildren: '../../main/pages/organizacion/organizacion.module#OrganizacionModule' },    
    { path: 'proforma', loadChildren: '../../main/pages/proforma/proforma.module#ProformaModule' },
    { path: 'personal', loadChildren: '../../main/pages/personal/personal.module#PersonalModule' },
    { path: 'venta', loadChildren: '../../main/pages/venta/venta.module#VentaModule' }
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }