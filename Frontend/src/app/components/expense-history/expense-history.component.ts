import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface Expense {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
}

@Component({
  selector: 'app-expense-history',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './expense-history.component.html',
  styleUrl: './expense-history.component.css'
})
export class ExpenseHistoryComponent implements OnInit {
    expenses: Expense[] = [];
  filteredExpenses: Expense[] = [];
  filterForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      searchTerm: [''],
      startDate: [''],
      endDate: ['']
    });
  }

  ngOnInit(): void {
    this.expenses = [
      { id: 1, date: '2025-05-12', category: 'Groceries', description: 'Grocery shopping', amount: 2300 },
      { id: 2, date: '2025-05-10', category: 'Transport', description: 'Taxi fare', amount: 500 },
      { id: 3, date: '2025-05-08', category: 'Utilities', description: 'Electricity bill', amount: 1200 },
      { id: 4, date: '2025-05-05', category: 'Entertainment', description: 'Movie tickets', amount: 600 }
    ];
    
    this.filteredExpenses = [...this.expenses];
  }

  applyFilters(): void {
    const searchTerm = this.filterForm.get('searchTerm')?.value?.toLowerCase();
    const startDate = this.filterForm.get('startDate')?.value;
    const endDate = this.filterForm.get('endDate')?.value;
    
    this.filteredExpenses = this.expenses.filter(expense => {
      // Filter by search term
      const matchesSearch = !searchTerm || 
        expense.description.toLowerCase().includes(searchTerm) ||
        expense.category.toLowerCase().includes(searchTerm);
        expense.id.toString().includes(searchTerm);
      
      // Filter by date range
      let matchesDateRange = true;
      if (startDate) {
        matchesDateRange = matchesDateRange && expense.date >= startDate;
      }
      if (endDate) {
        matchesDateRange = matchesDateRange && expense.date <= endDate;
      }
      
      return matchesSearch && matchesDateRange;
    });
  }

  resetFilters(): void {
    this.filterForm.reset();
    this.filteredExpenses = [...this.expenses];
  }

  deleteExpense(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this expense?');
    if (confirmed) {
    this.expenses = this.expenses.filter(expense => expense.id !== id);
    this.filteredExpenses = this.filteredExpenses.filter(expense => expense.id !== id);
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
  }
}


