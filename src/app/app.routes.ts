import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/products/products').then((c) => c.Products),
    },
    {
        path: 'products/:id',
        loadComponent: () => import('./pages/product-details/product-details').then((c) => c.ProductDetails),
    },
    {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart').then((c) => c.Cart),
        canActivate: [authGuard]
    },
    {
        path: 'cart/checkout',
        loadComponent: () => import('./pages/checkout/checkout').then((c) => c.Checkout),
        canActivate: [authGuard]
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