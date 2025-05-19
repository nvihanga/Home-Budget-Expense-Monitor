import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


interface BudgetEntry {
  userId: string;
  category: string;
  amount: number;
  status: 'OK' | 'Overspent';
}


@Component({
  selector: 'app-budget-management',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './budget-management.component.html',
  styleUrl: './budget-management.component.css'
})
export class BudgetManagementComponent implements OnInit{
  budgetForm!: FormGroup;
  budgetEntries: BudgetEntry[] = [];
  editMode = false;
  currentEditId: number | null = null;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  initForm(): void {
    this.budgetForm = this.fb.group({
      userId: ['', Validators.required],
      category: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    // Initialize with sample data for demonstration
    this.budgetEntries = [
      { userId: 'user1', category: 'Groceries', amount: 10000, status: 'OK' },
      { userId: 'user1', category: 'Rent', amount: 20000, status: 'Overspent' }
    ];
  }

  onSubmit() {
    if (!this.budgetForm.valid) {
      return;
    }

    const formValues = this.budgetForm.value;
    const newEntry: BudgetEntry = {
      userId: formValues.userId || '',
      category: formValues.category || '',
      amount: formValues.amount || 0,
      status: this.calculateStatus(formValues.amount || 0)
    };
    
    if (this.editMode && this.currentEditId !== null) {
      // Update existing entry
      this.budgetEntries[this.currentEditId] = newEntry;
      this.editMode = false;
      this.currentEditId = null;
    } else {
      // Add new entry
      this.budgetEntries.push(newEntry);
    }

    console.log('Form Submitted:', formValues);
    // send to backend...
    
    this.onClear();
  }

  calculateStatus(amount: number): 'OK' | 'Overspent' {
    // Simple logic to determine status based on budget amount
    return amount > 15000 ? 'Overspent' : 'OK';
  }

  // Simplified edit method
  handleEdit(index: number): void {
    this.editMode = true;
    this.currentEditId = index;
    const budget = this.budgetEntries[index];
    
    this.budgetForm.patchValue({
      userId: budget.userId,
      category: budget.category,
      amount: budget.amount
    });
  }

  onClear() {
    this.budgetForm.reset();
    this.editMode = false;
    this.currentEditId = null;
  }
}
