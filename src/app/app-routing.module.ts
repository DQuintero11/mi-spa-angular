import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';  
import { ProductoComponent } from './productos/producto/producto.component';  
import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  
  { path: 'login', component: LoginComponent },  
  { path: 'productos', component: ProductoComponent , canActivate: [AuthGuard]  }, 
];


