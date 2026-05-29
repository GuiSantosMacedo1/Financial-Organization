import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private authOptions(extraOptions: any = {}) {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}`, 'x-access-token': token }) : undefined;

    return {
      ...extraOptions,
      ...(headers ? { headers } : {})
    };
  }

  getTransactions(params?: any): Observable<any> {
    return this.http.get(this.apiUrl, this.authOptions({ params }));
}
  postTransactions(data:any): Observable<any> {
    return this.http.post(this.apiUrl, data, this.authOptions());
  }
  putTransactions(id:string, data:any): Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`, data, this.authOptions());
  }
  deleteTransactions(id:string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`, this.authOptions())
  }
  notifyTransactionsChanged(): void {
    this.transactionsChangedSubject.next();
  }
}