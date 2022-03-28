import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../../_service/user.service'

@Injectable({
  providedIn: 'root'
})
export class UserListResolver implements Resolve<boolean> {
  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // return of(true);
    let body = { page: 1, limit: 5, searchKeyword: '' }
    return this.userService.getUserData(body);
  }
}
