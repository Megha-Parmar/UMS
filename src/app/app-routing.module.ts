import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/_guard/auth.guard';
import { BaseComponent } from './pages/base/base.component';


// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })


const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
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
      // {
      //   path: 'dashboard',
      //   component: DashboardComponent,
      //   // loadChildren: () => import('./views/pages/base/project/project.module').then(m => m.ProjectModule),
      //   canActivate: [ModuleGuard],
      //   data: { roles: [UserRolesEnum.Builder, UserRolesEnum.Admin, UserRolesEnum.Agent] }
      // },

      {
        path: 'user',
        loadChildren: () => import('./pages/base/user/user.module').then(m => m.UserModule),
        // canActivate: [ModuleGuard],
        // data: { roles: [UserRolesEnum.Agent, UserRolesEnum.Builder, UserRolesEnum.Admin] }
      },

    ],
  }


  //  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  // { path: '**', redirectTo: 'auth', pathMatch: 'full' }
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,
      //    {
      //   preloadingStrategy: PreloadAllModules,
      //   useHash: true
      // }
    )

  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
