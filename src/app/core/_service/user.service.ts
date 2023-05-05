import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@modal/modal';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


// import * as bcrypt from 'bcryptjs';
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
      url = `/api/user/${this.loggedInUser._id}`
    } else { url = `/api/user?page=${data.page}&limit=${data.limit}` }
    return this.http.get(url);

  }


  getRoles(): Observable<any> {
    let url = `/api/role`
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
    return this.http.patch<any>(`/api/user/${id}`, data, { headers: httpHeaders });
  }

  DeleteUserData(id: number): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    // return this.http.post<Role>(API_ROLES_URL, role, { headers: httpHeaders});
    return this.http.delete<any>(`/api/user/${id}`);
  }

}