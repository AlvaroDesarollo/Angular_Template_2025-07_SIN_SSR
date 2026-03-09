import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '@core/constants';
import { catchError, throwError } from 'rxjs';
import { LoggerService, AlertService } from '@core/services/index';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const alertService = inject(AlertService);
  const logger = inject(LoggerService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message =
        error?.error?.msg ||
        error?.error?.message ||
        error?.message ||
        'Error inesperado';

      if (error.status >= 500) logger.error(message, error);

      // Manejo por status
      switch (error.status) {
        case 401:
          alertService.showAlert({
            type: 'error',
            message,
            duration: 3000,
          });
          if (!req.url.includes('/auth/')) {
            router.navigate([APP_ROUTES.LOGIN]);
          }
          break;

        case 403:
          alertService.showAlert({
            type: 'error',
            message: message,
            duration: 3000,
          });
          break;

        case 404:
          router.navigate([APP_ROUTES.NOT_FOUND]);
          break;

        case 500:
          alertService.showAlert({
            type: 'error',
            message: 'Error interno del servidor.',
            duration: 3000,
          });
          break;

        default:
          alertService.showAlert({
            type: 'error',
            message,
            duration: 3000,
          });
      }

      return throwError(() => error);
    }),
  );
};

