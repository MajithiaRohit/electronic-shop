import { Component, inject, signal } from '@angular/core';
import { CategoryService } from '../../../core/services/category';
import { Category } from '../../../../../models/categoryModel';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [RouterLink, DatePipe],
  templateUrl: './categories-page.html',
  styleUrl: './categories-page.css',
})
export class List {
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  categories = signal<Category[]>([]);
  loading = signal<boolean>(false);
  ;
  ngOnInit() {
    this.loadCategories();
  };

  loadCategories() {
    this.loading.set(true);
    this.categoryService.getAll().subscribe({
      next: (data: Category[]) => {
        console.log(data);
        this.categories.set(data);
        this.loading.set(false);
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
        this.loading.set(false);
      }
    });
  }

  editCategory(id: number) {
    this.router.navigate(['/categories/edit', id]);
  }    

  deleteCategory(id: number) {
    const category = this.categories().find(cat => cat.id === id);
    if (category && confirm(`Are you sure you want to delete the category "${category.name}"?`)) {
      this.categoryService.delete(category.id).subscribe({
        next: () => {
          this.categories.set(this.categories().filter(cat => cat.id !== category.id));
        },
        error: (error: any) => {
          console.error('Error deleting category:', error);
        }
      });
    }
  }

  isDefaultDate(value: string | null | undefined) {
    if (!value) {
      return true;
    }
    return new Date(value).getFullYear() === 1;
  }

  normalizeUtc(value: string | null | undefined) {
    if (!value) {
      return value ?? '';
    }
    // If no timezone info, treat as UTC by appending Z
    if (/[zZ]|[+-]\d{2}:\d{2}$/.test(value)) {
      return value;
    }
    return `${value}Z`;
  }
}

