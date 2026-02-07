import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/productService';
import { CategoryService } from '../../core/services/category';
import { Product } from '../../../../models/productModel';
import { Category } from '../../../../models/categoryModel';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, DatePipe],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  loading = signal<boolean>(false);

  ngOnInit() {
    this.loadSummary();
  }

  loadSummary() {
    this.loading.set(true);
    this.productService.getAll().subscribe({
      next: (data: Product[]) => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
    this.categoryService.getAll().subscribe({
      next: (data: Category[]) => {
        this.categories.set(data);
      },
      error: () => {
        // silent
      },
    });
  }

  totalProducts() {
    return this.products().length;
  }

  totalCategories() {
    return this.categories().length;
  }

  activeProducts() {
    return this.products().filter((p) => p.isActive).length;
  }

  lowStock() {
    return this.products().filter((p) => p.stockQuantity <= 5).length;
  }

  latestActivity() {
    const dates = this.products()
      .map((p) => p.updatedAt || p.createdAt)
      .filter((v) => !!v)
      .map((v) => this.normalizeUtc(v as string));
    if (dates.length === 0) {
      return null;
    }
    const latest = dates
      .map((v) => new Date(v))
      .sort((a, b) => b.getTime() - a.getTime())[0];
    return latest;
  }

  normalizeUtc(value: string) {
    if (/[zZ]|[+-]\d{2}:\d{2}$/.test(value)) {
      return value;
    }
    return `${value}Z`;
  }
}
