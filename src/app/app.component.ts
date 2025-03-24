import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Para rutas

@Component({
  selector: 'app-root',
  template: `
    <h1>Bienvenido a la SPA</h1>
    <router-outlet></router-outlet> <!-- Aquí se cargan las rutas -->
  `,
  standalone: true, // Hacer que el componente sea standalone
  imports: [CommonModule, RouterModule]  // Importar CommonModule y RouterModule
})
export class AppComponent {}




