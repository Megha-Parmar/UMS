import { User } from '@modal/modal';
import { createReducer, on } from '@ngrx/store';
import { LoginActions } from '../actions/login.actions';


export const loginFeatureKey = 'login';

// export interface State {

// }

export const initialState: User = {
  _id: 0,
  userName: '',
  firstName: '',
  lastName: '',
  uniqueId: '',
  phoneNumber: '',
  email: '',
  dob: undefined,
  status: '',
  role: undefined,
  profileImage: ''
};

export const loginReducer = createReducer(
  initialState,
  // on(LoginActions.loginSuccess, (state, { user }) => user),
  on(LoginActions.loginSuccess, (state, { user }) => ({ ...state, user })),
  // on(LoginActions.logoutSuccess, (state) => state),


  on(LoginActions.logoutSuccess, state => ({ ...state, user: '' })),
  // on(LoginActions.logoutSuccess, (state) => ({  ...state })),
  //  on(removeToken, (state): AuthState => ({ ...state, token: "" })),

  // on(LoginActions.loginFailure, state => ({ ...state })),
  on(LoginActions.loginFailure, (state, { error }) => ({ ...state, error })),
  on(LoginActions.logoutFailure, (state, { error }) => ({ ...state, error })),

  // on(LoginActions.logoutFailure, state => ({ ...state })),
);

