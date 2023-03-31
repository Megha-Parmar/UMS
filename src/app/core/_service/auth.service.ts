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

    if(!localStorage.user){
    localStorage.setItem('userName', user.userName)

    localStorage.setItem('user', JSON.stringify(user.user))
    localStorage.setItem('token', user.token)
  }else{
    localStorage.setItem('user', JSON.stringify(user))
  }

  }

  getUserDetail() {
    if (localStorage.getItem('user')) {
      const user: User = JSON.parse(localStorage.user)
      // return localStorage.getItem(JSON.parse('user'))
      return user;

    }
    return null;
  }

  getLocalStrorageDetail(key:string) {
    if (localStorage.getItem(key)) {
      
      return localStorage.getItem(key);

    }
    return null;
  }


  saveUserName(user: User) {
    localStorage.setItem('userName', user.userName)


  }

  getUserName() {
    return localStorage.getItem('userName')


  }



  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`/api/auth/login`,data);

    // return this.http.get<any>(`https://jsonplaceholder.typicode.com/posts`);

    
    // return this.http.get<any>(`http://localhost:3000/api/auth/user?email=${data.email}&password=${data.password}`); // AT THE TIME  OF `ng test`

  }
  logout() {
    localStorage.clear();
  }

  ngOnDestroy() {
    console.log('Service destroy')
  }
}
