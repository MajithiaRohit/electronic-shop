import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { Footer } from './layout/footer/footer';
import { Sidebar } from './layout/sidebar/sidebar';
import { Header } from './layout/header/header';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Sidebar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private router = inject(Router);
  protected readonly title = signal('electronic-shop-ui');
  protected readonly showShell = signal(true);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe((event) => {
        const url = event.urlAfterRedirects.split('?')[0];
        this.showShell.set(url !== '/login');
      });
  }
}
