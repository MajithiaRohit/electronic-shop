import { Component, inject, signal } from '@angular/core';
import { Router ,RouterLink } from '@angular/router';
import { Product } from '../../../../../models/productModel';
import { ProductService } from '../../../core/services/productService';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CategoryService } from '../../../core/services/category';
import { Category } from '../../../../../models/categoryModel';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
})
export class ProductList {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  loading = signal<boolean>(false);
  private router = inject(Router);

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
  }

  loadProducts() {
    this.loading.set(true);
    this.productService.getAll().subscribe({
      next: (data: Product[]) => {
        this.products.set(data);
        this.loading.set(false);
      } ,
      error: (error: any) => {
        console.error('Error fetching products:', error);
        this.loading.set(false);
      }
    });
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (data: Category[]) => {
        this.categories.set(data);
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      },
    });
  }

  getCategoryName(categoryId: number) {
    return this.categories().find((c) => c.id === categoryId)?.name ?? '';
  }

  updateProduct(id: number) {
    this.router.navigate(['/products/edit', id]);
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(id).subscribe(() => {
        this.loadProducts();
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
