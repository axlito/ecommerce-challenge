import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/products/products').then((c) => c.Products),
    },
    {
        path: 'user',
        loadComponent: () => import('./pages/user/user').then((c) => c.User),
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then((c) => c.Login),
    },
    {
        path: '**',
        redirectTo: '',
    },
];