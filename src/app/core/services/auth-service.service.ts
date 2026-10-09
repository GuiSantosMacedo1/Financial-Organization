import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY); // só o token
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}