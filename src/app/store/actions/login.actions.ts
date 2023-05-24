import { User } from '@modal/modal';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const LoginActions = createActionGroup({
  source: 'Login',
  events: {
    'Load Logins': emptyProps(),
    'Login Success': props<{ user: User }>(),
    'Login Failure': props<{ error: any }>(),
    'Logout Failure': props<{ error: any }>(),
    'Logout Success': emptyProps(),
  }
});
