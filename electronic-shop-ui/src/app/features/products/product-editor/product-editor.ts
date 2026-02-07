import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../core/services/productService';
import { CategoryService } from '../../../core/services/category';
import { Category } from '../../../../../models/categoryModel';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-editor.html',
  styleUrl: './product-editor.css',
})
export class ProductForm {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  productId = 0;
  loading = signal<boolean>(false);
  isEdit = signal<boolean>(false);
  categories = signal<Category[]>([]);

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: [''],
    price: [0, [Validators.required, Validators.min(0)]],
    stockQuantity: [0, [Validators.required, Validators.min(0)]],
    categoryId: [0, Validators.required],
    isActive: true,
  });

  ngOnInit() {
    this.loadCategories();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.productId = +id;
      this.loadProduct();
    }
  }

  loadProduct() {
    this.productService.getById(this.productId).subscribe((res) => {
      this.form.patchValue(res);
    });
  }

  loadCategories() {
    this.categoryService.getAll().subscribe((res) => {
      this.categories.set(res);
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const data = this.form.getRawValue();
    if (this.isEdit()) {
      this.productService.update({ id: this.productId, ...data }).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.create(data).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/products']);
  }
}
