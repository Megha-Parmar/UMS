import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@modal/modal';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/common/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  saveUserDetail(user: any) {

    if (!localStorage.user) {
      localStorage.setItem(GlobalConstants.userName, user.user.userName)

      localStorage.setItem(GlobalConstants.user, JSON.stringify(user.user))
      localStorage.setItem(GlobalConstants.token, user.token)
    } else {
      localStorage.setItem(GlobalConstants.user, JSON.stringify(user))
    }

  }

  getUserDetail() {
    if (localStorage.getItem(GlobalConstants.user)) {
      const user: User = JSON.parse(localStorage.user)
      // return localStorage.getItem(JSON.parse('user'))
      return user;

    }
    return null;
  }

  getLocalStorageDetail(key: string) {
    if (localStorage.getItem(key)) {

      return localStorage.getItem(key);

    }
    return null;
  }


  saveUserName(user: User) {
    localStorage.setItem(GlobalConstants.userName, user.userName)


  }

  getUserName() {
    // const userName = localStorage.getItem('userName');
    // return userName ? true : false;
    return localStorage.getItem(GlobalConstants.userName)


  }



  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`/api/auth/login`, data);

    // return this.http.get<any>(`https://jsonplaceholder.typicode.com/posts`);


    // return this.http.get<any>(`http://localhost:3000/api/auth/user?email=${data.email}&password=${data.password}`); // AT THE TIME  OF `ng test`

  }

  setNewPassword(data: { id: string; password: string }): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    // return this.http.post<Role>(API_ROLES_URL, role, { headers: httpHeaders});
    // return this.http.patch<any>(`/api/user/${id}`, data, { headers: httpHeaders });
    return this.http.patch<any>(`/api/auth/generate-password`, data, { headers: httpHeaders });
  }
  logout() {
    localStorage.clear();
  }

  ngOnDestroy() {
    console.log('Service destroy')
  }
}
