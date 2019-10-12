import { LoginInitialState } from './../states';
import { handleActions } from 'redux-actions';
import { ILoginModal } from '../interfaces';
import { ProxyLoginActionTypes } from '../actions';

export const proxyLoginReducer = handleActions<ILoginModal, any>(
  {
    [ProxyLoginActionTypes.PROXY_LOGIN_REQUEST]: (
      state = LoginInitialState,
      action,
    ): ILoginModal => ({
      ...state,
      isLoading: true,
      isLoggedIn: false,
    }),
    [ProxyLoginActionTypes.PROXY_LOGIN_SUCCESS]: (
      state = LoginInitialState,
      action,
    ): ILoginModal => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
    }),
    [ProxyLoginActionTypes.PROXY_LOGIN_FAILURE]: (
      state = LoginInitialState,
      action,
    ): ILoginModal => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      error: action.payload.error,
    }),
  },
  LoginInitialState,
);
