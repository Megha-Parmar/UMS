import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse, User } from '@modal/modal';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/common/GlobalConstants';
import { EncryptDecryptService } from './encrypt-decrypt.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private encryptDecryptService: EncryptDecryptService, private localStorageService: LocalStorageService) { }

  saveUserDetail(user: any) {
    if (!this.encryptDecryptService.getDecryptedLocalStorage(GlobalConstants.user)) {
      this.encryptDecryptService.setEncryptedLocalStorage(GlobalConstants.userName, user.user.userName);
      this.encryptDecryptService.setEncryptedLocalStorage(GlobalConstants.user, user.user);
      this.encryptDecryptService.setEncryptedLocalStorage(GlobalConstants.token, user.token);
    } else {
      this.encryptDecryptService.setEncryptedLocalStorage(GlobalConstants.user, user.user);
    }
  }

  getDecryptLocalStorageDetail(key: string) {
    return this.encryptDecryptService.getDecryptedLocalStorage(key)
  }

  setEncryptLocalStorageDetail(key: string, value) {
    return this.encryptDecryptService.setEncryptedLocalStorage(key, value)
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${GlobalConstants.apiUrls.auth.login}`, data);
  }

  ssoLoginSave(data): Observable<APIResponse<User>> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', GlobalConstants.httpHeader.applicationJson);
    // return this.http.post<APIResponse<User>>(`${GlobalConstants.apiUrls.user.saveSSOUser}`, data, { headers: httpHeaders });

    return this.http.post<APIResponse<User>>(`${GlobalConstants.apiUrls.auth.sSOLogin}`, data, { headers: httpHeaders });
  }

  setNewPassword(data: { id: string; password: string }): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    return this.http.patch<any>(`${GlobalConstants.apiUrls.auth.setNewPassword}`, data, { headers: httpHeaders });
  }
  forgetPassword(data): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    return this.http.patch<any>(`${GlobalConstants.apiUrls.auth.forgetPassword}`, data, { headers: httpHeaders });
  }

  ngOnDestroy() {
    console.log('Service destroy')
  }
}
