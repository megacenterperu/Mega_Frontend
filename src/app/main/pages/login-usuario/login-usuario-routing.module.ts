import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'listUsuario', loadChildren: '../../../main/pages/login-usuario/usuario/usuario.module#UsuarioModule' },
  { path: 'ListRol', loadChildren: '../../../main/pages/login-usuario/rol/rol.module#RolModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginUsuarioRoutingModule { }
