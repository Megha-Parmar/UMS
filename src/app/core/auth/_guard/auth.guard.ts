import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from '@common/GlobalConstants';
import { EncryptDecryptService } from '@service/encrypt-decrypt.service';


export const AuthGuard = () => {
  return inject(EncryptDecryptService)
    .getDecryptedLocalStorage(GlobalConstants.user) ? true : inject(Router).parseUrl('/auth/login');


};

export const LoginGuard = () => {
  return !inject(EncryptDecryptService)
    .getDecryptedLocalStorage(GlobalConstants.user) ? true : inject(Router).parseUrl('/dashboard');

};