import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { platformInterceptor } from '@interceptors/platform-interceptor';
import { authInterceptor } from '@interceptors/auth-interceptor';
import { notificationInterceptor } from '@interceptors/notification-interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes, withComponentInputBinding()),
        provideClientHydration(withEventReplay()),
        provideHttpClient(
            withFetch(),
            withInterceptors([platformInterceptor, authInterceptor, notificationInterceptor])
        )
    ]
};
