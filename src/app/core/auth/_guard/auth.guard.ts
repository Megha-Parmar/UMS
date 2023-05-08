import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from '@common/GlobalConstants';
import { AuthService } from '@service/auth.service';


export const AuthGuard = () => {
  return inject(AuthService)
    .getDecryptLocalStorageDetail(GlobalConstants.user) ? true : inject(Router).parseUrl('/auth/login');

};

export const LoginGuard = () => {
  return !inject(AuthService)
    .getDecryptLocalStorageDetail(GlobalConstants.user) ? true : inject(Router).parseUrl('/dashboard');

};