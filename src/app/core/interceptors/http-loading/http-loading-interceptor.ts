import {
  HttpInterceptorFn} from '@angular/common/http';
import {
  HttpContextToken
} from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { SpinnerService } from '@core/services';

export const SKIP_LOADING = new HttpContextToken<boolean>(() => false);

let activeRequests = 0;

export const httpLoadingInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(SKIP_LOADING)) {
    return next(req);
  }

  const spinner = inject(SpinnerService);
  activeRequests++;
  spinner.show();

  return next(req).pipe(
    finalize(() => {
      activeRequests = Math.max(0, activeRequests - 1);
      if (activeRequests === 0) {
        spinner.hide();
      }
    }),
  );
};

