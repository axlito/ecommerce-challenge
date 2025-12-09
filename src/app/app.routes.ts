import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/landing-page/landing-page').then((c) => c.LandingPage),
    },
    {
        path: '**',
        redirectTo: '',
    },
];