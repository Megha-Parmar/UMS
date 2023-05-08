import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants, QueryParamsConstant } from '@common/GlobalConstants';
import { APIResponse, ListResponse, User } from '@modal/modal';
import { Observable } from 'rxjs';
import { EncryptDecryptService } from './encrypt-decrypt.service';


// import * as bcrypt from 'bcryptjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedInUser: User;
  saltRounds = 10;

  constructor(private http: HttpClient, private encryptDecryptService: EncryptDecryptService) {
    this.loggedInUser = this.encryptDecryptService.getDecryptedLocalStorage(GlobalConstants.user);
  }

  getUserData(data: { page: number; limit: number; searchKeyword: string; }): Observable<APIResponse<ListResponse>> {
    let url = '';
    this.loggedInUser = this.encryptDecryptService.getDecryptedLocalStorage(GlobalConstants.user);
    if (this.loggedInUser?.role?.name == 'USER') {
      url = `${GlobalConstants.apiUrls.user.getUserDetail}${this.loggedInUser._id}`
    } else { url = `${GlobalConstants.apiUrls.user.getUserList}?${QueryParamsConstant.page}=${data.page}&${QueryParamsConstant.limit}=${data.limit}` }
    return this.http.get<APIResponse<ListResponse>>(url);
  }

  getRoles(): Observable<any> {
    return this.http.get(GlobalConstants.apiUrls.user.getRole);
  }

  saveUserData(data: User): Observable<APIResponse<User>> {
    const httpHeaders = this.setHeader(GlobalConstants.httpHeader.applicationJson)
    return this.http.post<APIResponse<User>>(`${GlobalConstants.apiUrls.user.saveUser}`, data, { headers: httpHeaders });
  }

  updateUserData(data: User, id: number): Observable<APIResponse<User>> {
    const httpHeaders = this.setHeader(GlobalConstants.httpHeader.applicationJson)
    return this.http.patch<APIResponse<User>>(`${GlobalConstants.apiUrls.user.updateUser}${id}`, data, { headers: httpHeaders });
  }

  deleteUserData(id: number): Observable<APIResponse<User>> {
    // const httpHeaders = this.setHeader(GlobalConstants.httpHeader.applicationJson)
    return this.http.delete<APIResponse<User>>(`${GlobalConstants.apiUrls.user.deleteUser}${id}`);
  }

  setHeader(header) {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', header);
    return httpHeaders;
  }

}