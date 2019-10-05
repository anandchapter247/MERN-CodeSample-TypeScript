import { createAction } from 'redux-actions';
import { ILoginActionData } from '../interfaces';

export enum LoginActionTypes {
  LOGIN_REQUEST = 'Request login user!',
  LOGIN_SUCCESS = 'Login Successfully!',
  LOGIN_FAILURE = 'Login Failed',
  LOGOUT_REQUEST = 'Logout Started!',
}
export const LoginRequest = createAction<ILoginActionData>(
  LoginActionTypes.LOGIN_REQUEST,
);

export const LoginSuccess = createAction(LoginActionTypes.LOGIN_SUCCESS);
export const LoginFailed = createAction(LoginActionTypes.LOGIN_FAILURE);

export const LogOutRequest = createAction(LoginActionTypes.LOGOUT_REQUEST);
