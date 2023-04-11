import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getLocalStrorageDetail(key:string) {
    if (localStorage.getItem(key)) {
      
      return localStorage.getItem(key);

    }
    return null;
  }
  
  
  getUserName() {
    return localStorage.getItem('userName')


  }



  login(data: { email: string; password: string }): Observable<any> {
    return this.http.get<any>(`/api/auth/user?email=${data.email}&password=${data.password}`);

    // return this.http.get<any>(`https://jsonplaceholder.typicode.com/posts`);

    
    // return this.http.get<any>(`http://localhost:3000/api/auth/user?email=${data.email}&password=${data.password}`); // AT THE TIME  OF `ng test`

  }

  setNewPassword(data: { id: string; password: string }): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    // return this.http.post<Role>(API_ROLES_URL, role, { headers: httpHeaders});
    // return this.http.patch<any>(`/api/user/${id}`, data, { headers: httpHeaders });
    return this.http.patch<any>(`/api/auth/generate-password`,data,{ headers: httpHeaders });
  }
  logout() {
    localStorage.clear();
  }

  ngOnDestroy() {
    console.log('Service destroy')
  }
}
