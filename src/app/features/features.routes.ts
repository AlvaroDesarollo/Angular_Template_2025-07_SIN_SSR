import { Routes } from '@angular/router';
import { LayoutComponent } from '@shared/index';

export const featuresRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@features/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('@features/dashboard/dashboard.page').then(
            (m) => m.DashboardPage,
          ),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('@features/auth/auth.routes').then((m) => m.AuthRoutes),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('@features/not-found/not-found.page').then((m) => m.NotFoundPage),
  },
];

