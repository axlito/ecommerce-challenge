import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AppStore } from '@store/app-store';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const appStore = inject(AppStore);
    const router = inject(Router);
    if (!appStore.userIsAuthenticated()) router.navigate(['/login']);
    return true;
};