import { createAction } from "redux-actions";
import { ILoginModal } from "../interfaces";

export enum LoginActionTypes {
  REQUEST_USER_LOGIN = "Request login user!"
}
export const requestLogin = createAction<ILoginModal>(
  LoginActionTypes.REQUEST_USER_LOGIN
);
