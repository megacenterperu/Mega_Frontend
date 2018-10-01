import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [  
    { path: '', redirectTo: 'sample', pathMatch: 'full' },
    { path: 'sample', loadChildren: '../../main/pages/sample/sample.module#SampleModule' },
    { path: 'proveedor', loadChildren: '../../main/pages/proveedor/proveedor.module#ProveedorModule' },
    { path: 'compra', loadChildren: '../../main/pages/compra/compra.module#CompraModule' },
    { path: 'tipo', loadChildren: '../../main/pages/tipo-genericos/tipo-genericos.module#TipoGenericosModule' },    
    
    { path: 'unidadmedida', loadChildren: '../../main/pages/unidadmedida/unidadmedida.module#UnidadmedidaModule' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }