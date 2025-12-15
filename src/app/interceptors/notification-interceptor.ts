import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsStore } from '@store/notification-store';
import { catchError, EMPTY, Observable } from 'rxjs';

export function notificationInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    let notificationStore = inject(NotificationsStore);
    let router = inject(Router);
    return next(req).pipe(
        catchError((error) => {
            // console.log('Interceptor says:', error);
            if (error.status === 401) notificationStore.addNotificationData('error', 'Invalid username or password');
            if (error.status === 404) router.navigate(['/error'])
            return EMPTY;
        })
    );
}