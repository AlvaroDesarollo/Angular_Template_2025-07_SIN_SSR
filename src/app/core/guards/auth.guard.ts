import { inject } from '@angular/core';
import { CanActivateFn} from '@angular/router';
import { Router } from '@angular/router';
import { APP_ROUTES } from '@core/constants';
import { AuthService, Global } from '@core/services';

export const authGuard: CanActivateFn = (_route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const global = inject(Global);

  authService.restoreSession();

  if (global.isLogged() && authService.hasValidToken()) {
    return true;
  }

  authService.clearSession();
  return router.createUrlTree([APP_ROUTES.LOGIN], {
    queryParams: { returnUrl: state.url || APP_ROUTES.HOME },
  });
};

