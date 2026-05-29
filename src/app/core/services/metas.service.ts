import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface MetasCreate {
  title: string;
  description: string;
  amount: number;
  amountSaved: number;
  date?: string | Date;
  saved: boolean;
}

export interface MetasResponse<T = any> {
  data: T;
  message?: string;
  timestamp?: string;
}

@Injectable({ providedIn: 'root' })
export class MetasService {
  private apiUrl = 'http://localhost:3000/api/metas';

  constructor(private http: HttpClient) {}

  private authOptions() {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return headers ? { headers } : {};
  }

  getMetas(): Observable<MetasResponse<MetasCreate[]>> {
    return this.http.get<MetasResponse<MetasCreate[]>>(this.apiUrl, this.authOptions());
  }

  postMeta(payload: MetasCreate) {
    return this.http.post<MetasResponse>(this.apiUrl, payload, this.authOptions());
  }

  putMeta(id: string, payload: MetasCreate) {
    return this.http.put<MetasResponse>(`${this.apiUrl}/${id}`, payload, this.authOptions());
  }

  patchAmountSaved(id: string, amountSaved: number) {
    return this.http.patch<MetasResponse>(`${this.apiUrl}/${id}/amount-saved`, { amountSaved }, this.authOptions());
  }
}