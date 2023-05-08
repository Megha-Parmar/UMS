import { Routes } from "@angular/router";
import { routerURLConstant } from "@common/GlobalConstants";
import { AuthComponent } from "@pages/auth/auth.component";


export const AuthRoute: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: `${routerURLConstant.login}`,
        pathMatch: 'full'
      },
      {
        path: `${routerURLConstant.login}`,
        loadComponent: () => import('../pages/auth/login/login.component').then(m => m.LoginComponent),
        // data: {returnUrl: window.location.pathname}
      },
      {
        path: `${routerURLConstant.generatePassword}`,
        loadComponent: () => import('../pages/auth/generate-password/generate-password.component').then(m => m.GeneratePasswordComponent),
        // data: {returnUrl: window.location.pathname}
      },
    ]
  },
]
