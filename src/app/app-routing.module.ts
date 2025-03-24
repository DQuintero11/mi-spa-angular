import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';  // Ajusta el path si es necesario
import { ProductoComponent } from './productos/producto/producto.component';  // Ajusta el path si es necesario

export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirigir a /login por defecto
  { path: 'login', component: LoginComponent },  // Ruta para login
  { path: 'productos', component: ProductoComponent },  // Ruta para productos
];


