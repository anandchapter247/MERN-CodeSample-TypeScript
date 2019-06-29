import { LoginInitialState } from "./../states";
import { handleActions } from "redux-actions";
import { ILoginModal } from "../interfaces";
import { LoginActionTypes } from "../actions";

export const loginReducer = handleActions<ILoginModal, ILoginModal>(
  {
    [LoginActionTypes.REQUEST_USER_LOGIN]: (
      state = LoginInitialState,
      action
    ): ILoginModal => ({
      isLoading: true
    })
  },
  LoginInitialState
);
