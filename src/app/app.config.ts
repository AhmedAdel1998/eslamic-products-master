import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';

import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
// import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthInterceptor } from './config/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    // provideClientHydration(), 
    provideAnimations(),
    provideHttpClient(), 
    // provideAnimationsAsync(),
    provideHttpClient(withFetch(),
    withInterceptors([AuthInterceptor]))]
};
