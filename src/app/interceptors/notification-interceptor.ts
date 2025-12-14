import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { NotificationsStore } from '@store/notification-store';
import { catchError, EMPTY, Observable } from 'rxjs';

export function notificationInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    let notificationStore = inject(NotificationsStore);
    return next(req).pipe(
        catchError((error) => {
            // if (error.status === 404)
            console.log('Interceptor says:', error);
            notificationStore.addNotificationData('error', error.status);
            return EMPTY;
        })
    );
}