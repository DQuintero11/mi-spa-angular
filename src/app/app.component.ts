import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  
import { LoginService } from './auth/login.service';  
import { Router } from '@angular/router';

// El componente standalone
@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
    <div *ngIf="loginService.isAuthenticated() && !isLoginPage">
      <div class="cinta">
        <button class="btn-logout" (click)="logout()">Cerrar sesión</button>
      </div>
    </div>

    <div>
      <router-outlet></router-outlet>
    </div>
  `,
  standalone: true,  // Componente standalone
  imports: [CommonModule, RouterModule]  // Solo importar lo necesario
})
export class AppComponent implements OnInit {
  constructor(public loginService: LoginService , private router: Router) {}

  isLoginPage = false;

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (this.router.url.includes('/login')) {
        this.isLoginPage = true;
      } else {
        this.isLoginPage = false;
      }
    });
  };

  logout() {
    this.loginService.logout();   
    this.router.navigate(['/login']); 
  }
}
