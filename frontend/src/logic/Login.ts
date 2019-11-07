import { createLogic } from "redux-logic";
import { push } from "react-router-redux";
import { toast } from "react-toastify";
import {
  LoginActionTypes,
  LoginSuccess,
  LoginFailed,
  redirectTo,
  showLoader,
  hideLoader
} from "../actions";
import { ApiRoutes, AppRoutes } from "../config";
import { ApiHelper } from "../helper";
/**
 *
 */

let toastId: any = null;

const loginLogic = createLogic({
  type: LoginActionTypes.LOGIN_REQUEST,
  async process(data, dispatch: any, done) {
    console.log("dffffffffffffffffffffff");
    const action: any = data.action;
    console.log(action);
    console.log(action.payload);
    dispatch(showLoader());
    const response = await new ApiHelper().FetchFromServer(
      ApiRoutes.ADMIN_LOGIN.service,
      ApiRoutes.ADMIN_LOGIN.url,
      ApiRoutes.ADMIN_LOGIN.method,
      ApiRoutes.ADMIN_LOGIN.authenticate,
      undefined,
      action.payload
    );
    console.log(response);
    if (response && !response.isError) {
      console.log("dfdsfdfds");
      dispatch(hideLoader());
      if (!toast.isActive(toastId)) {
        toastId = toast.success(response.messages[0]);
      }
      localStorage.setItem("token", response.data.token);
      dispatch(
        LoginSuccess({
          userData: response.data.data
        })
      );
      dispatch(push("/dashboard"));
      done();
    } else {
      dispatch(hideLoader());
      console.log(response);
      if (!toast.isActive(toastId)) {
        console.log("fffffffffff");
        toastId = toast.error(response.messages[0]);
      }
      dispatch(
        LoginFailed({
          error: response.messages[0]
        })
      );
      done();
    }
  }
});

const logOutLogic = createLogic({
  type: LoginActionTypes.LOGOUT_REQUEST,
  async process({ action }, dispatch: any, done) {
    localStorage.removeItem("token");
    dispatch(redirectTo({ path: AppRoutes.LOGIN }));
    done();
  }
});

export const LoginLogics = [loginLogic, logOutLogic];
