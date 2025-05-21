import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BudgetItem {
  category: string;
  budget: number;
  spent: number;
  remaining: number;
  remainingAmount: string;
}


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  budgetItems: BudgetItem[] = [
    {
      category: 'Groceries',
      budget: 20000,
      spent: 23400,
      remaining: -17,
      remainingAmount: 'Rs. 3,400'
    },
    {
      category: 'Rent',
      budget: 15000,
      spent: 8200,
      remaining: 45,
      remainingAmount: 'Rs. 6,800'
    },
    {
      category: 'Utilities',
      budget: 5500,
      spent: 6600,
      remaining: -20,
      remainingAmount: 'Rs. 1,100'
    },
    {
      category: 'Transport',
      budget: 6000,
      spent: 3600,
      remaining: 40,
      remainingAmount: 'Rs. 2,400'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Initialize data or fetch from service
  }

  getBadgeClass(item: BudgetItem): string {
    if (item.remaining > 0) {
      return 'bg-success'; // Under budget (positive remaining)
    } else if (item.remaining < 0) {
      return 'bg-danger'; // Over budget (negative remaining)
    } else {
      return 'bg-secondary'; // Exactly on budget
    }
  }
  }
