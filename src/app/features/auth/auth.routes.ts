import { Routes } from '@angular/router';

export const AuthRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('@features/auth/login/login.page').then((m) => m.LoginPage),
  },
];

