import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../Actions/userActions';
import { User } from 'src/app/interface/user';

export interface UserInterface {
  registrationSuccessMessage: string;
  registrationFailureMessage: string;
  loginSuccessMessage: string;
  loginFailureMessage: string;
  resetSuccessMessage: string;
  resetFailureMessage: string;
  forgotSuccessMessage: string;
  forgotFailureMessage: string;
  getuserSuccessMessage: string;
  getuserFailureMessage: string;
  deleteuserSuccessMessage: string;
  deleteuserFailureMessage: string;
  users:User[]
}

const initialState: UserInterface = {
  registrationFailureMessage: '',
  registrationSuccessMessage: '',
  loginSuccessMessage: '',
  loginFailureMessage: '',
  resetSuccessMessage: '',
  resetFailureMessage: '',
  forgotSuccessMessage: '',
  forgotFailureMessage: '',
  getuserSuccessMessage: '',
  getuserFailureMessage: '',
  deleteuserSuccessMessage: '',
  deleteuserFailureMessage: '',
  users:[]
};

export const userReducers = createReducer(
  initialState,
  on(UserActions.LoginUserSuccess, (state) => ({
    ...state,
    loginSuccessMessage: 'Login Successful',
    loginFailureMessage: '',
  })),
  on(UserActions.LoginUserFailure, (state, { error }) => ({
    ...state,
    loginSuccessMessage: '',
    loginFailureMessage: error,
  })),
  on(UserActions.RegisterUserSuccess, (state, { message }) => ({
    ...state,
    registrationSuccessMessage: message,
    registrationFailureMessage: '',
  })),
  on(UserActions.RegisterUserFailure, (state, { error }) => ({
    ...state,
    registrationSuccessMessage: '',
    registrationFailureMessage: error,
  })),
  on(UserActions.ResetUserSuccess, (state, { message }) => ({
    ...state,
    resetSuccessMessage: message,
    resetFailureMessage: '',
  })),
  on(UserActions.ResetUserFailure, (state, { error }) => ({
    ...state,
    resetSuccessMessage: '',
    resetFailureMessage: error,
  })),
  on(UserActions.ForgotUserSuccess, (state, { message }) => ({
    ...state,
    forgotSuccessMessage: message,
    forgotFailureMessage: '',
  })),
  on(UserActions.ForgotUserFailure, (state, { error }) => ({
    ...state,
    forgotSuccessMessage: '',
    forgotFailureMessage: error,
  }))
,
  on(UserActions.DeleteUserSuccess, (state, { message }) => ({
    ...state,
    deleteuserSuccessMessage: message,
    deleteuserFailureMessage: '',
  })),
  on(UserActions.DeleteUserFailure, (state, { error }) => ({
    ...state,
    deleteuserSuccessMessage: '',
    deleteuserFailureMessage: error,
  })),
  on(UserActions.getUsersSuccess, (state, { users }) => ({
    ...state,
    getSuccessMessage: '',
    deleteuserFailureMessage: '',
  })),
  on(UserActions.DeleteUserFailure, (state, { error }) => ({
    ...state,
    getuserSuccessMessage: '',
  getuserFailureMessage: error,
  }))
);

