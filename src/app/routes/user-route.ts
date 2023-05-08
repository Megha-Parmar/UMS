import { Routes } from "@angular/router";
import { UserListResolver } from "@guard/_resolver/user-list.resolver";



export const UserRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('../pages/base/user/user/user.component').then(m => m.UserComponent),
    resolve: { userResolver: UserListResolver }
  }
]