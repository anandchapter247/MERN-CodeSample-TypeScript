import { LoginInitialState } from './../states';
import { handleActions } from 'redux-actions';
import { ILoginModal } from '../interfaces';
import { LoginActionTypes } from '../actions';

export const loginReducer = handleActions<ILoginModal, ILoginModal>(
  {
    [LoginActionTypes.LOGIN_REQUEST]: (
      state = LoginInitialState,
      action,
    ): ILoginModal => ({ ...state }),
  },
  LoginInitialState,
);
