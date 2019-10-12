import { createAction } from 'redux-actions';
import { IProxyLoginActionData } from '../interfaces';

export enum ProxyLoginActionTypes {
  PROXY_LOGIN_REQUEST = 'Request PROXY_login organization!',
  PROXY_LOGIN_SUCCESS = 'PROXY_Login Successfully!',
  PROXY_LOGIN_FAILURE = 'Login Failed',
}
export const proxyLoginRequest = createAction<IProxyLoginActionData>(
  ProxyLoginActionTypes.PROXY_LOGIN_REQUEST,
);

export const proxyLoginSuccess = createAction(
  ProxyLoginActionTypes.PROXY_LOGIN_SUCCESS,
);
export const proxyLoginFailed = createAction(
  ProxyLoginActionTypes.PROXY_LOGIN_FAILURE,
);
