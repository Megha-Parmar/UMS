import { Routes } from "@angular/router";
import { UserListResolver } from "../core/auth/_resolver/user-list.resolver";


export const UserRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('../pages/base/user/user/user.component').then(m => m.UserComponent),
    resolve: { users: UserListResolver }
  },
  {
    path: '',
    loadComponent: () => import('../pages/base/user/user/user.component').then(m => m.UserComponent),
    resolve: { users: UserListResolver }
  }
]