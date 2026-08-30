import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environment/environments';

export interface UserCreate { name?: string; email?: string; password: string; }
export interface AuthResponse {
  token?: string;
  user?: any;
  data?: {
    token?: string;
    user?: any;
  };
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${environment.apiUrl}/users`;
  constructor(private http: HttpClient) { }

  postUser(data: UserCreate): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl, data)
      .pipe(
        tap(res => {
          const token = res?.token ?? res?.data?.token;
          if (token) localStorage.setItem('token', token);
        })
      );
  }

  loginUser(data: { email?: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data)
      .pipe(
        tap(res => {
          const token = res?.token ?? res?.data?.token;
          if (token) localStorage.setItem('token', token);
        })
      );
  }
}
