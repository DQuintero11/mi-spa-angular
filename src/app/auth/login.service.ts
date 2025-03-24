import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { catchError, map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://localhost:7247/api/auth/login';  
  
  constructor(private http: HttpClient) { }

  // Realizar login
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      map(response => {
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
        }
        return response;
      }),
      catchError(error => {
        console.error('Error de autenticación', error);
        throw error;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    console.log('Sesión cerrada');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
