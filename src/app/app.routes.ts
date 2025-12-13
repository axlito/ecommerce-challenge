import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/products/products').then((c) => c.Products),
    },
    {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart').then((c) => c.Cart),
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