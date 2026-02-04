import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'categories',
        loadComponent: () => import('./features/categories/list/list').then(m => m.List),
    },
    {
        path: '',
        redirectTo: 'categories',
        pathMatch: 'full',
    },
    {
        path: 'categories/add',
        loadComponent: () => import('./features/categories/form/form').then(m => m.Form),
    },
    {
        path: 'categories/edit/:id',
        loadComponent: () => import('./features/categories/form/form').then(m => m.Form),
    }
];
