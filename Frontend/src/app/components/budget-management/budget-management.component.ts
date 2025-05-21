import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

interface BudgetEntry {
  userId: string;
  category: string; // Category Name for UI
  amount: number;
  status: 'OK' | 'Overspent';
}

@Component({
  selector: 'app-budget-management',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './budget-management.component.html',
  styleUrl: './budget-management.component.css'
})
export class BudgetManagementComponent implements OnInit {
  budgetForm!: FormGroup;
  budgetEntries: BudgetEntry[] = [];
  editMode = false;
  currentEditId: number | null = null;
  categories: any[] = [];
  categoriesLoaded = false;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  initForm(): void {
    this.budgetForm = this.fb.group({
      userId: ['', Validators.required],
      category: ['', Validators.required], // Will store categoryId (string from select)
      amount: ['', [Validators.required, Validators.min(0)]]
    });
  }

  loadCategories(): void {
    console.log('Calling getExpenseCategories()');
    this.apiService.getExpenseCategories().subscribe({
      next: (data) => {
        console.log('Categories received:', data);
        this.categories = data;
        this.categoriesLoaded = true;
      },
      error: (err) => {
        console.error('Failed to load categories', err);
      }
    });
  }

  // Fix: Convert id to number before searching categories
  getCategoryNameById(id: number | string): string {
    const catIdNum = Number(id);
    const match = this.categories.find(cat => cat.categoryId === catIdNum);
    return match ? match.categoryName : 'Unknown';
  }

  onSubmit() {
    if (!this.budgetForm.valid) return;

    const formValues = this.budgetForm.value;

    console.log('Form values:', formValues);
    console.log('Categories:', this.categories);
    console.log('Category name resolved:', this.getCategoryNameById(formValues.category));

    const newEntry: BudgetEntry = {
      userId: formValues.userId || '',
      category: this.getCategoryNameById(formValues.category),
      amount: formValues.amount || 0,
      status: this.calculateStatus(formValues.amount || 0)
    };

    const payload = {
      userId: formValues.userId,
      categoryId: formValues.category,
      newBudget: formValues.amount
    };

    if (this.editMode && this.currentEditId !== null) {
      this.apiService.updateBudget(payload).subscribe({
        next: (res) => {
          console.log('Budget updated successfully:', res);
          this.budgetEntries[this.currentEditId!] = newEntry;
          this.editMode = false;
          this.currentEditId = null;
          this.onClear();
        },
        error: (err) => {
          console.error('Error updating budget:', err);
        }
      });
    } else {
      this.apiService.updateBudget(payload).subscribe({
        next: (res) => {
          console.log('Budget created successfully:', res);
          this.budgetEntries.push(newEntry);
          this.onClear();
        },
        error: (err) => {
          console.error('Error creating budget:', err);
        }
      });
    }
  }

  calculateStatus(amount: number): 'OK' | 'Overspent' {
    return amount > 15000 ? 'Overspent' : 'OK';
  }

  handleEdit(index: number): void {
    this.editMode = true;
    this.currentEditId = index;
    const budget = this.budgetEntries[index];

    // Find the categoryId from category name
    const matched = this.categories.find(cat => cat.categoryName === budget.category);
    const categoryId = matched ? matched.categoryId : null;

    // Populate the form fields for editing
    this.budgetForm.patchValue({
      userId: budget.userId,
      category: categoryId,
      amount: budget.amount
    });

    // Removed immediate updateBudget call here to avoid unwanted backend update
  }

  onClear() {
    this.budgetForm.reset();
    this.editMode = false;
    this.currentEditId = null;
  }
}
