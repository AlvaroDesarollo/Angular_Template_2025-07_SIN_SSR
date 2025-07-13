import { Routes } from '@angular/router';
import { LayoutComponent } from '@shared/index';

export const pagesRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@pages/home/home.page').then((m) => m.HomePage),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('@pages/not-found/not-found.page').then((m) => m.NotFoundPage),
  },
];
