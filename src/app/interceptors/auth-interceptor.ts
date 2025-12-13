import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '@environments/environment';
import { AppStore } from '@store/app-store';
import { Observable } from 'rxjs';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    if (req.url.includes('/cart')) {
        let token: any = inject(AppStore).user_token();
        req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        console.log(token);
    }
    return next(req);
};