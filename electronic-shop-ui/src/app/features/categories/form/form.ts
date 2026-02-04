import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../core/services/category';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  private fb = inject(FormBuilder);
  private service = inject(CategoryService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isEdit = signal(false);
  categoryId = 0;

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    description: [''],
    isActive: [true],
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.categoryId = +id;
      this.loadCategory();
    }
  }
  loadCategory() {
    this.service.getById(this.categoryId).subscribe((res) => {
      this.form.patchValue(res);
    });
  }

  submit() {
    if(this.form.invalid) {
      return;
    }

    const data = this.form.getRawValue();
    if (this.isEdit()) {
      this.service.update({ id: this.categoryId, ...data }).subscribe(() => {
        this.router.navigate(['/categories']);
      });
    } else {
      this.service.create(data).subscribe(() => {
        this.router.navigate(['/categories']);
      });
    }
  }
}



