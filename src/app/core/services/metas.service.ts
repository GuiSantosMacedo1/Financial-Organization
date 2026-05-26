import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface MetasCreate {
  title: string;
  description: string;
  amount: number;
  date?: string | Date;
  saved: boolean;
}

export interface MetasResponse<T = any> {
  data: T;
  message: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class MetasService {
  private apiUrl = 'http://localhost:3000/api/metas';
  constructor(private http: HttpClient) { }

  private authOptions() {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}`, 'x-access-token': token }) : undefined;
    return { ...(headers ? { headers } : {}) };
  }

  getMetas(): Observable<MetasResponse> {
    return this.http.get<MetasResponse>(this.apiUrl, this.authOptions());
  }
  postMeta(data: MetasCreate): Observable<MetasResponse> {
    return this.http.post<MetasResponse>(this.apiUrl, data, this.authOptions());
  }
}