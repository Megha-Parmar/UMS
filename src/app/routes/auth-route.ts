import { Routes } from "@angular/router";
import { AuthComponent } from "../pages/auth/auth.component";


export const AuthRoute: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () => import('../pages/auth/login/login.component').then(m => m.LoginComponent),
        // data: {returnUrl: window.location.pathname}
      },
    ]
  },
]
