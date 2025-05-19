import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://localhost:7031/api';

  constructor(private http: HttpClient) {}
  addExpense(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/expense/add`, data, { responseType: 'text' });
  }

  getExpenseCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/expense/categories`);
  }

  addExpenseCategory(data: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/expense/add-category`, data, { responseType: 'text' });
}

}