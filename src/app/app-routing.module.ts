import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';  // Importar LoginComponent
import { ProductoComponent } from './productos/producto/producto.component';  // Importar ProductosComponent
import { AuthGuard } from './auth/auth.guard';  // Importar el guard de autenticación

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirigir a login al inicio
  { path: 'login', component: LoginComponent },  // Ruta para login
  { path: 'productos', component: ProductoComponent, canActivate: [AuthGuard] },  // Ruta protegida para productos
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
