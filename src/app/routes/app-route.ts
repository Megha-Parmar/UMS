import { Routes } from '@angular/router';
import { AuthGuard, LoginGuard } from '../core/auth/_guard/auth.guard';
import { BaseComponent } from '../pages/base/base.component';


export const appRoute: Routes = [
  {
    path: 'auth',
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./auth-route').then(m => m.AuthRoute),
      }
    ]
  },
  {
    path: '',
    component: BaseComponent,
    canMatch: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'user',
        loadChildren: () => import('../routes/user-route').then(m => m.UserRoute),
      },
      {
        path: 'dashboard',
        loadComponent: () => import('../pages/base/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
    ],

  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];