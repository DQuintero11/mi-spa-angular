import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app-routing.module';
import { provideHttpClient, HttpClientModule } from '@angular/common/http';  // Importamos HttpClientModule


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),  // Proveedor para HttpClient
    provideRouter(appRoutes)  // Proveedor para el enrutamiento
  ]
})
  .catch((err) => console.error(err));
