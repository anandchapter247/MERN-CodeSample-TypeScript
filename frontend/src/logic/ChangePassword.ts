import { createLogic } from "redux-logic";
import { toast } from "react-toastify";
import {
  ChangePasswordActionTypes,
  showLoader,
  hideLoader,
  changePasswordSuccess,
  changePasswordFailed
} from "../actions";
import { ApiHelper } from "../helper/ApiHelper";
import { ApiRoutes } from "../config";

let toastId: any = null;

const ChangePasswordLogic = createLogic({
  type: ChangePasswordActionTypes.CHANGE_PASSWORD_REQUEST,
  async process(data, dispatch: any, done) {
    const action: any = data.action;
    console.log("******************");
    toast.dismiss();
    dispatch(showLoader());
    const response = await new ApiHelper().FetchFromServer(
      ApiRoutes.ADMIN_CHANGE_PASSWORD.service,
      ApiRoutes.ADMIN_CHANGE_PASSWORD.url,
      ApiRoutes.ADMIN_CHANGE_PASSWORD.method,
      ApiRoutes.ADMIN_CHANGE_PASSWORD.authenticate,
      undefined,
      action.payload
    );
    console.log(response);
    if (response && !response.isError) {
      console.log("dfdsfdfds");
      dispatch(hideLoader());
      dispatch(changePasswordSuccess());
      if (!toast.isActive(toastId)) {
        toastId = toast.success(response.messages[0]);
      }
      done();
    } else {
      console.log(response);
      dispatch(hideLoader());
      if (!toast.isActive(toastId)) {
        toastId = toast.error(response.messages[0]);
      }
      dispatch(
        changePasswordFailed({
          isError: true
        })
      );
      done();
    }
  }
});

export const ChangePasswordLogics = [ChangePasswordLogic];
