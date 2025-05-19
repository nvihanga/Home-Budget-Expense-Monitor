import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

interface Expense {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
}

@Component({
  selector: 'app-expense-history',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './expense-history.component.html',
  styleUrl: './expense-history.component.css'
})
export class ExpenseHistoryComponent implements OnInit {
  filteredExpenses: Expense[] = [];
  filterForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.filterForm = this.fb.group({
      userId: [''],
      startDate: [''],
      endDate: ['']
    });
  }

  ngOnInit(): void {
    // Initially empty or you could fetch recent expenses
    this.filteredExpenses = [];
  }

  applyFilters(): void {
    const userId = Number(this.filterForm.get('userId')?.value);
    const startDate = this.filterForm.get('startDate')?.value;
    const endDate = this.filterForm.get('endDate')?.value;

    if (!userId || !startDate || !endDate) {
      alert("Please fill in all filter fields.");
      return;
    }

    this.apiService.getExpenseHistory(userId, startDate, endDate).subscribe({
      next: (data) => {
        this.filteredExpenses = data;
      },
      error: (err) => {
        console.error('Error fetching filtered expenses:', err);
        this.filteredExpenses = [];
      }
    });
  }

  resetFilters(): void {
    this.filterForm.reset();
    this.filteredExpenses = [];
  }

  deleteExpense(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this expense?');
    if (confirmed) {
      this.filteredExpenses = this.filteredExpenses.filter(expense => expense.id !== id);
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
  }
}
