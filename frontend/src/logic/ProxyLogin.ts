import { createLogic } from "redux-logic";
import { toast } from "react-toastify";
import {
  showLoader,
  hideLoader,
  ProxyLoginActionTypes,
  proxyLoginSuccess,
  proxyLoginFailed
} from "../actions";
import { ApiRoutes } from "../config";
import { ApiHelper } from "../helper/ApiHelper";
/**
 *
 */

let toastId: any = null;

const ProxyLoginLogic = createLogic({
  type: ProxyLoginActionTypes.PROXY_LOGIN_REQUEST,
  async process(data, dispatch: any, done) {
    const action: any = data.action;
    dispatch(showLoader());
    const response = await new ApiHelper().FetchFromServer(
      ApiRoutes.ADMIN_PROXY_LOGIN.service,
      ApiRoutes.ADMIN_PROXY_LOGIN.url,
      ApiRoutes.ADMIN_PROXY_LOGIN.method,
      ApiRoutes.ADMIN_PROXY_LOGIN.authenticate,
      undefined,
      action.payload
    );
    if (response && !response.isError) {
      dispatch(hideLoader());
      //  localStorage.setItem('token', response.data.token);
      dispatch(
        proxyLoginSuccess({
          userData: response.data.data
        })
      );
      let redirectionUrl: string = `${window.location.protocol}//${response.data.data.wildCardDomain}.${process.env.REACT_APP_ORGANIZATION_URL}/verify-user?token=${response.data.token}`;
      window.open(redirectionUrl, "_blank");
      done();
    } else {
      dispatch(hideLoader());
      if (!toast.isActive(toastId)) {
        toastId = toast.error(response.messages[0]);
      }
      dispatch(
        proxyLoginFailed({
          error: response.messages[0]
        })
      );
      done();
    }
  }
});

export const ProxyLoginLogics = [ProxyLoginLogic];
