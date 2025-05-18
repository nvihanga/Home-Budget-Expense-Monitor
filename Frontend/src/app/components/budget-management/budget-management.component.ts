import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-budget-management',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './budget-management.component.html',
  styleUrl: './budget-management.component.css'
})
export class BudgetManagementComponent {
    budgetForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.budgetForm = this.fb.group({
      userId: ['', Validators.required],
      category: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.budgetForm.valid) {
      console.log('Form Submitted:', this.budgetForm.value);
      // send to backend...
    }
  }

  onClear() {
    this.budgetForm.reset();
  }
}
