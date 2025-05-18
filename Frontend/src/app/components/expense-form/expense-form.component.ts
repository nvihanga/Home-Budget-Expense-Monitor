import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expense-form.component.html'
})
export class ExpenseFormComponent {
  expenseForm!: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private apiService: ApiService) {
        this.initializeForm();
  }

  initializeForm(): void {
    this.expenseForm = this.fb.group({
      userId: ['', Validators.required],
      categoryId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      date: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.expenseForm.invalid)  {
      return;
  }
      this.loading = true;
      this.successMessage = '';
      this.errorMessage = '';

      

      this.apiService.addExpense(this.expenseForm.value).subscribe({
        next: () => {
          this.successMessage = 'Expense added successfully!';
          this.expenseForm.reset();
        },
        error: (err) => {
          console.error('Error adding expense:', err);
          console.error('Error body:', err.error);
          this.errorMessage = 'Failed to add expense. Please try again.';
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  

  onClear(): void {
    this.expenseForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
  }
}
