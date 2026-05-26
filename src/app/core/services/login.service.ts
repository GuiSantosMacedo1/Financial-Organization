import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface UserCreate { name?: string; email?: string; password: string; }
export interface AuthResponse { token?: string; user?: any }

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api/users'
  constructor(private http: HttpClient) { }

  postUser(data: UserCreate): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl, data)
      .pipe(
        tap(res => { if (res?.token) localStorage.setItem('token', res.token); })
      );
  }

  loginUser(data: { email?: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data)
      .pipe(
        tap(res => { if (res?.token) localStorage.setItem('token', res.token); })
      );
  }
}
