import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin-guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login').then(m => m.Login),
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard-page').then(m => m.DashboardPage),
        canActivate: [adminGuard],
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'categories',
        loadComponent: () => import('./features/categories/categories-page/categories-page').then(m => m.List),
        canActivate: [adminGuard],
    },
    {
        path: 'categories/add',
        loadComponent: () => import('./features/categories/category-editor/category-editor').then(m => m.Form),
        canActivate: [adminGuard],
    },
    {
        path: 'categories/edit/:id',
        loadComponent: () => import('./features/categories/category-editor/category-editor').then(m => m.Form),
        canActivate: [adminGuard],
    },
    {
        path : 'products',
        loadComponent: () => import('./features/products/products-page/products-page').then(m => m.ProductList),
        canActivate: [adminGuard],
    },
    {
        path: 'products/add',
        loadComponent: () => import('./features/products/product-editor/product-editor').then(m => m.ProductForm),
        canActivate: [adminGuard],
    },
    {
        path: 'products/edit/:id',
        loadComponent: () => import('./features/products/product-editor/product-editor').then(m => m.ProductForm),
        canActivate: [adminGuard],
    },
    {
        path: '**',
        redirectTo: 'dashboard',
    },

];
