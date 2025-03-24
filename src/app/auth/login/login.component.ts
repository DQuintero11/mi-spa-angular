import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true, // Esto habilita el componente como standalone
  imports: [CommonModule, ReactiveFormsModule , RouterModule] 
})
export class LoginComponent {

}
