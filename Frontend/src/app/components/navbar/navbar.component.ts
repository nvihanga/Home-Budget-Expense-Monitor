import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
 isExpensesDropdownOpen = false;
isBudgetsDropdownOpen = false;

toggleExpensesDropdown(): void {
  this.isExpensesDropdownOpen = !this.isExpensesDropdownOpen;
}

toggleBudgetsDropdown(): void {
  this.isBudgetsDropdownOpen = !this.isBudgetsDropdownOpen;
}

  
}
