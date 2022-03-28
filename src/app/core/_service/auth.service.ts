import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/_modal/modal';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  saveUserDetail(user: any) {
    localStorage.setItem('userName', user.username)

    localStorage.setItem('user', JSON.stringify(user))
  }

  getUserDetail() {
    if (localStorage.getItem('user')) {
      const user: User = JSON.parse(localStorage.user)
      // return localStorage.getItem(JSON.parse('user'))
      return user;

    }
    return null;
  }


  saveUserName(user: User) {
    localStorage.setItem('userName', user.username)


  }

  getUserName() {
    return localStorage.getItem('userName')


  }



  login(data: { email: string; password: string }): Observable<any> {
    return this.http.get<any>(`/api/auth/user?email=${data.email}&password=${data.password}`);
  }
  logout() {
    localStorage.clear();
  }
}
