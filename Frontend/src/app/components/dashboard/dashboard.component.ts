import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BudgetItem {
  category: string;
  budget: number;
  spent: number;
  remaining: number;
  status: 'over' | 'under' | 'on-track';
}

interface BudgetSummary {
  category: string;
  budgeted: number;
  due: string;
  remaining: number;
  percentage: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  month: string = 'May';
  searchQuery: string = '';
  Math = Math; // Make Math available in the template
  
  // Budget Summary Data
  budgetSummaries: BudgetSummary[] = [
    {
      category: 'Rent',
      budgeted: 15000,
      due: '5th - 10th',
      remaining: 0,
      percentage: 100
    },
    {
      category: 'Utilities',
      budgeted: 5000,
      due: '10th - 15th',
      remaining: 1200,
      percentage: 76
    },
    {
      category: 'Groceries',
      budgeted: 20000,
      due: '1st - 30th',
      remaining: -1500,
      percentage: 107
    },
    {
      category: 'Transport',
      budgeted: 3000,
      due: '1st - 30th',
      remaining: 400,
      percentage: 87
    }
  ];

  // Budget vs Spending Data
  budgetItems: BudgetItem[] = [
    {
      category: 'Groceries',
      budget: 20000,
      spent: 21500,
      remaining: -1500,
      status: 'over'
    },
    {
      category: 'Rent',
      budget: 15000,
      spent: 8200,
      remaining: 6800,
      status: 'under'
    },
    {
      category: 'Utilities',
      budget: 5000,
      spent: 5800,
      remaining: -800,
      status: 'over'
    },
    {
      category: 'Transport',
      budget: 3000,
      spent: 2600,
      remaining: 400,
      status: 'under'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Any initialization code can go here
  }

  // Format currency in Indian Rupee format
  formatCurrency(amount: number): string {
    return 'Rs. ' + amount.toLocaleString('en-IN');
  }

  // Filter budget items based on search query
  get filteredBudgetItems(): BudgetItem[] {
    if (!this.searchQuery) {
      return this.budgetItems;
    }
    
    return this.budgetItems.filter(item => 
      item.category.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
