import { inject } from '@angular/core';
import { UserService } from '@service/user.service';


export const UserListResolver = () => {
  const userService = inject(UserService);

  let body = { page: 1, limit: 5, searchKeyword: '' }
  return userService.getUserData(body);
}