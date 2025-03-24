import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../login.service'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';  
import { ToastrService, ToastNoAnimation } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,  
  imports: [CommonModule, ReactiveFormsModule]  
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private loginService: LoginService , private router: Router, private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    debugger;
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { username, password } = this.loginForm.value;

    this.loginService.login(username, password).subscribe(
      response => {
        this.isLoading = false;
        this.router.navigate(['/productos']);
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'Error de autenticación. Intenta nuevamente.';
      }
    );
  }
}

