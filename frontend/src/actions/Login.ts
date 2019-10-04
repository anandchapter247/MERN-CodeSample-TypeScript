import { createAction } from 'redux-actions';
import { ILoginModal } from '../interfaces';

export enum LoginActionTypes {
  LOGIN_REQUEST = 'Request login user!',
}
export const LoginRequest = createAction<ILoginModal>(
  LoginActionTypes.LOGIN_REQUEST,
);
