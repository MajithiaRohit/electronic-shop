import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  showPassword = signal<boolean>(false);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  login() {
    if (this.form.invalid) {
      this.error.set('Please fill in all required fields with valid data.');
      return;
    }
    this.loading.set(true);
    this.error.set(null);

    this.authService.login(this.form.getRawValue()).subscribe({
      next: (res) => {
        this.authService.saveSession(res.token, res.role);
        this.router.navigate(['/']);
        this.loading.set(false);
      },
      error: (err) => {
        let message = 'Something went wrong. Please try again.';

        if (err?.status === 401) {
          message = 'Incorrect email or password.';
        } else if (err?.status === 403) {
          message = 'Only admin can login.';
        } else if (err?.error?.message || err?.error) {
          message = err.error?.message || err.error;
        }

        this.error.set(message);
        this.loading.set(false);
      }
    })
  }
}
