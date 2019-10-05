import { LoginInitialState } from './../states';
import { handleActions } from 'redux-actions';
import { ILoginModal } from '../interfaces';
import { LoginActionTypes } from '../actions';

export const loginReducer = handleActions<ILoginModal, any>(
  {
    [LoginActionTypes.LOGIN_REQUEST]: (
      state = LoginInitialState,
      action,
    ): ILoginModal => ({
      ...state,
      isLoading: true,
      isLoggedIn: false,
    }),
    [LoginActionTypes.LOGIN_SUCCESS]: (
      state = LoginInitialState,
      action,
    ): ILoginModal => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      userData: action.payload.userData,
    }),
    [LoginActionTypes.LOGIN_FAILURE]: (
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
