import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private apiUrl = 'https://financial-organization-backend.onrender.com/api/transactions';
  private transactionsChangedSubject = new Subject<void>();
  transactionsChanged$ = this.transactionsChangedSubject.asObservable();

  constructor(private http: HttpClient) { }

  getTransactions(params?: any): Observable<any> {
  return this.http.get(this.apiUrl, { params });
}
  postTransactions(data:any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
  putTransactions(id:string, data:any): Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
  deleteTransactions(id:string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
  notifyTransactionsChanged(): void {
    this.transactionsChangedSubject.next();
  }
}