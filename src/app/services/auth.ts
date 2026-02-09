import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;  // Add other user properties as needed
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:3000/users';
  
  // Signal para saber si está autenticado
  isAuthenticated = signal<boolean>(false);
  currentUser = signal<User | null>(null);

  constructor() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser.set(JSON.parse(user));
      this.isAuthenticated.set(true);
    }
  }

  login(username: string, password: string): Observable<User[]> {
    // Buscar usuario en la "API" (json-server)
    return this.http.get<User[]>(`${this.apiUrl}?username=${username}&password=${password}`)
      .pipe(
        tap(users => {
          if (users.length > 0) {
            // Usuario encontrado
            const user = users[0];
            this.currentUser.set(user);
            this.isAuthenticated.set(true);
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.router.navigate(['/coches']);
          } else {
            // Usuario no encontrado
            alert('Usuario o contraseña incorrectos');
          }
        })
      );

  }

  public Logout() {
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    localStorage.removeItem('currentUser');
    console.log('User logged out');
  }

  isAdmin(): boolean {
    const user = this.currentUser();
    return user ? user.role === 'admin' : false;
  }
  
}
