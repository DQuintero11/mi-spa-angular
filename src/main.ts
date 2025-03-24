import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app-routing.module';
import { provideHttpClient, HttpClientModule } from '@angular/common/http';  // Importamos HttpClientModule
import { provideToastr} from 'ngx-toastr';
import { provideAnimations} from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination'; 

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideToastr(),
    provideHttpClient(),  
    provideRouter(appRoutes) ,
    NgxPaginationModule  
  ]
})
  .catch((err) => console.error(err));
