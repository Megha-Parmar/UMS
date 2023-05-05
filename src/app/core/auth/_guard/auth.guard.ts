import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_service/auth.service';

export const AuthGuard = () => {
  return inject(AuthService)
    .getUserName() ? true : inject(Router).parseUrl('/auth/login');

};

export const LoginGuard = () => {
  return !inject(AuthService)
    .getUserName() ? true : inject(Router).parseUrl('/dashboard');

};