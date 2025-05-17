import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExpenseHistoryComponent } from './components/expense-history/expense-history.component';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';
import { BudgetManagementComponent } from './components/budget-management/budget-management.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', loadComponent: () => LoginComponent},
    {path: 'dashboard', loadComponent: () => DashboardComponent},
    {path: 'expenses', loadComponent: () => ExpenseHistoryComponent},
    {path: 'add-expense',loadComponent: () => ExpenseFormComponent},
    {path: 'budgets', loadComponent: () => BudgetManagementComponent},
];


