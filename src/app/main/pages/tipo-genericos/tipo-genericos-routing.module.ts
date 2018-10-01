import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [  
    { path: '', redirectTo: 't-produto', pathMatch: 'full' },
    { path: 't-produto', loadChildren: '../../../main/pages/tipo-genericos/tipo-producto/tipo-producto.module#TipoProductoModule' },
    { path: 't-documento', loadChildren: '../../../main/pages/tipo-genericos/tipo-documento/tipo-documento.module#TipoDocumentoModule' }
   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TipoGenericosRoutingModule { }