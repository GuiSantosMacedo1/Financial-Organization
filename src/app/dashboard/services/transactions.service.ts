import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private apiUrl = 'http://localhost:3000/api/transactions';

  constructor(private http: HttpClient) { }

getTransactions(params?: any): Observable<any> {
  return this.http.get(this.apiUrl, { params });
}
}