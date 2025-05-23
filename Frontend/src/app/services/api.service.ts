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

  getExpenseHistory(userId: number, startDate: string, endDate: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/expense/history`, {
    params: {
      userId: userId.toString(),
      startDate,
      endDate
    }
  });
}

  updateBudget(data: any): Observable<any> {
    console.log('Sending updateBudget request to:', `${this.baseUrl}/budget/update`);

    return this.http.put(`${this.baseUrl}/budget/update`, data, { responseType: 'text' });
  }

  getMonthlyExpenseSummary(userId: number, month: number, year: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/expense/summary`, {
    params: {
      userId: userId.toString(),
      month: month.toString(),
      year: year.toString()
    }
  });
}



}