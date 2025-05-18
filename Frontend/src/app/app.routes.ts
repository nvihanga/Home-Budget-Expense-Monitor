import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExpenseHistoryComponent } from './components/expense-history/expense-history.component';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';
import { BudgetManagementComponent } from './components/budget-management/budget-management.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', loadComponent: () => LoginComponent},
    {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'expenses/entry', component: ExpenseFormComponent },
      { path: 'expenses/history', component: ExpenseHistoryComponent },
      { path: 'budgets', component: BudgetManagementComponent },
      // you can add more here later...
    ]
  }

    // {path: 'dashboard', loadComponent: () => DashboardComponent},
    // {path: 'expenses', 
    //     children: [
    //   { path: 'entry', loadComponent: () => ExpenseFormComponent },      // <-- add-expense renamed
    //   { path: 'history', loadComponent: () => ExpenseHistoryComponent },
    //            // default redirect to entry
    // ],
    //     },
    // {path: 'budgets', loadComponent: () => BudgetManagementComponent},
];


