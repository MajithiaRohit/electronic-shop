import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'categories',
        loadComponent: () => import('./features/categories/categories-page/categories-page').then(m => m.List),
    },
    {
        path: '',
        redirectTo: 'categories',
        pathMatch: 'full',
    },
    {
        path: 'categories/add',
        loadComponent: () => import('./features/categories/category-editor/category-editor').then(m => m.Form),
    },
    {
        path: 'categories/edit/:id',
        loadComponent: () => import('./features/categories/category-editor/category-editor').then(m => m.Form),
    },
    {
        path : 'products',
        loadComponent: () => import('./features/products/products-page/products-page').then(m => m.ProductList),
    },
    {
        path: 'products/add',
        loadComponent: () => import('./features/products/product-editor/product-editor').then(m => m.ProductForm),
    },
    {
        path: 'products/edit/:id',
        loadComponent: () => import('./features/products/product-editor/product-editor').then(m => m.ProductForm),
    }

];
