import { isPlatformBrowser } from '@angular/common';
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { debounceTime, EMPTY, Observable } from 'rxjs';

export function platformInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const platformId = inject(PLATFORM_ID);
    if (isPlatformBrowser(platformId)) return next(req);
    return EMPTY;
    // return next(req).pipe(debounceTime(500));
}