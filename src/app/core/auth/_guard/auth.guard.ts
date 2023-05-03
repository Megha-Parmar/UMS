import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, createUrlTreeFromSnapshot } from '@angular/router';
import { AuthService } from '../../_service/auth.service';

export const AuthGuard = (next: ActivatedRouteSnapshot) => {
  return inject(AuthService)
    .getUserName() ? true : createUrlTreeFromSnapshot(next, ['/', 'auth']);

};

export const LoginGuard = (next: ActivatedRouteSnapshot) => {
  return !inject(AuthService)
    .getUserName() ? true : createUrlTreeFromSnapshot(next, ['/', 'user']);

};