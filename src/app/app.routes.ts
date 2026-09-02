import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'design/focus-area',
    pathMatch: 'full'
  },
  {
    path: 'design',
    loadComponent: () => import('./layout/design-shell/design-shell.component').then(m => m.DesignShellComponent),
    children: [
      {
        path: 'focus-area',
        loadComponent: () => import('./features/focus-area/focus-area.page').then(m => m.FocusAreaPage)
      },
      {
        path: 'intake',
        loadComponent: () => import('./features/intake/intake.page').then(m => m.IntakePage)
      },
      {
        path: 'as-is',
        loadComponent: () => import('./features/as-is/as-is.page').then(m => m.AsIsPage)
      },
      {
        path: 'calibration',
        loadComponent: () => import('./features/calibration/calibration.page').then(m => m.CalibrationPage)
      },
      {
        path: 'to-be',
        loadComponent: () => import('./features/to-be/to-be.page').then(m => m.ToBePage)
      },
      {
        path: 'daily-run',
        loadComponent: () => import('./features/daily-run/daily-run.page').then(m => m.DailyRunPage)
      }
    ]
  }
];
