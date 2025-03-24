import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';  // Importar HttpClientModule
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/auth.interceptor';  // Importar AuthInterceptor
import { LoginComponent } from './auth/login/login.component';  // Importar LoginComponent
import { ProductoComponent } from './productos/producto/producto.component';  // Importar ProductosComponent
import { AppRoutingModule } from './app-routing.module';  // Importar AppRoutingModule

@NgModule({
  declarations: [
    AppComponent,  // El componente principal
    LoginComponent,  // Asegúrate de que esté declarado aquí
    ProductoComponent,  // Asegúrate de que esté declarado aquí
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  // Asegúrate de que HttpClientModule esté importado
    AppRoutingModule,  // Asegúrate de importar el AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,  // Configurar el interceptor de autenticación
      multi: true,  // Permite múltiples interceptores
    },
  ],
  bootstrap: [AppComponent],  // Arrancar la aplicación con AppComponent
})
export class AppModule {}
