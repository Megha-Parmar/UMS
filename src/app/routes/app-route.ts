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
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/user',
        pathMatch: 'full'
      },
      {
        path: 'user',
        loadChildren: () => import('../routes/user-route').then(m => m.UserRoute),
        // canActivate: [ModuleGuard],
        // data: { roles: [UserRolesEnum.Agent, UserRolesEnum.Builder, UserRolesEnum.Admin] }
      },

    ],
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' }
];