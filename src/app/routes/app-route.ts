import { Routes } from '@angular/router';
import { routerURLConstant } from '@common/GlobalConstants';
import { AuthGuard, LoginGuard } from '@guard/_guard/auth.guard';
import { BaseComponent } from '@pages/base/base.component';


export const appRoute: Routes = [
  {
    path: `${routerURLConstant.auth}`,
    canMatch: [LoginGuard],
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
        redirectTo: `/${routerURLConstant.dashboard}`,
        pathMatch: 'full'
      },
      {
        path: `${routerURLConstant.user}`,
        loadChildren: () => import('../routes/user-route').then(m => m.UserRoute),
      },
      {
        path: `${routerURLConstant.dashboard}`,
        loadComponent: () => import('../pages/base/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
    ],

  },
  { path: '**', redirectTo: `${routerURLConstant.dashboard}`, pathMatch: 'full' }
];