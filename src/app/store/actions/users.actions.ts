import { createActionGroup, emptyProps } from '@ngrx/store';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'Load Users': emptyProps(),


  }
});
