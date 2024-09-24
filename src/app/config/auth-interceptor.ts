
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const cookie = inject(CookieService)
    const authReq = req.clone({
        setHeaders: {
            'x-user': cookie.get("x-user")
        }
    });

    return next(authReq);
};