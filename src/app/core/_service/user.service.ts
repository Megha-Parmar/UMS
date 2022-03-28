import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, User } from 'src/app/_modal/modal';
import { AuthService } from './auth.service';
// import * as bcrypt from 'bcryptjs';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedInUser: User;
  tokenFromUI: string = "0123456789123456";
  constructor(private http: HttpClient, private authService: AuthService) {
    this.loggedInUser = this.authService.getUserDetail();
  }
  saltRounds = 10;
  getUserData(data: { page: number; limit: number; searchKeyword: string; }): Observable<any> {
    let url = '';
    this.loggedInUser = this.authService.getUserDetail();
    if (this.loggedInUser?.role?.name == 'USER') {
      url = `/api/user/${this.loggedInUser.id}`
    } else { url = `/api/user?_page=${data.page}&_limit=${data.limit}` }
    return this.http.get(url);

  }

  SaveUserData(data: User): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    // return this.http.post<Role>(API_ROLES_URL, role, { headers: httpHeaders});
    return this.http.post<any>(`/api/user`, data, { headers: httpHeaders });
  }

  UpdateUserData(data: User, id: number): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    // return this.http.post<Role>(API_ROLES_URL, role, { headers: httpHeaders});
    return this.http.put<any>(`/api/user/${id}`, data, { headers: httpHeaders });
  }

  DeleteUserData(id: number): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    // return this.http.post<Role>(API_ROLES_URL, role, { headers: httpHeaders});
    return this.http.delete<any>(`/api/user/${id}`);
  }

  encryptUsingAES256(myPlaintextPassword: string) {
    let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(myPlaintextPassword), _key, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }
  // decryptUsingAES256() {
  //   let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
  //   let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);

  //   let decrypted = CryptoJS.AES.decrypt(
  //     this.encrypted, _key, {
  //       keySize: 16,
  //       iv: _iv,
  //       mode: CryptoJS.mode.ECB,
  //       padding: CryptoJS.pad.Pkcs7
  //     }).toString(CryptoJS.enc.Utf8);
  // }
}




/*import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, User } from 'src/app/_modal/modal';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserData(data: { page: number; limit: number; searchKeyword: string; }): Observable<APIResponse> {
    return this.http.get<APIResponse>(`/api/user?_page=${data.page}&_limit=${data.limit}`);
  }

  SaveUserData(data: User): Observable<APIResponse> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    // return this.http.post<Role>(API_ROLES_URL, role, { headers: httpHeaders});
    return this.http.post<APIResponse>(`/api/user`, data, { headers: httpHeaders });
  }
}
 */