// account.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

export interface Account {
  name: string;
  email: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface AccountResponse<T = any> {
  data: T;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class AccountService {
  private apiUrl = `${environment.apiUrl}/users/me`;

  constructor(private http: HttpClient) { }

  getAccount(): Observable<AccountResponse<Account>> {
    return this.http.get<AccountResponse<Account>>(this.apiUrl);
  }

  updateAccount(payload: Account): Observable<AccountResponse<Account>> {
    return this.http.put<AccountResponse<Account>>(this.apiUrl, payload);
  }

  changePassword(payload: ChangePasswordPayload): Observable<AccountResponse> {
    return this.http.patch<AccountResponse>(`${this.apiUrl}/password`, payload);
  }
}