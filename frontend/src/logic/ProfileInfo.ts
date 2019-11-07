import { createLogic } from "redux-logic";
import { toast } from "react-toastify";
import {
  ProfileActionTypes,
  profileInfoSuccess,
  profileInfoFailed,
  redirectTo,
  profileupdateSuccess,
  profileupdateFailed,
  showLoader,
  hideLoader
} from "../actions";
import { ApiHelper } from "../helper/ApiHelper";
import { ApiRoutes, AppRoutes } from "../config";

let toastId: any = null;

const profileInfoLogic = createLogic({
  type: ProfileActionTypes.PROFILE_INFO_REQUEST,
  async process(data, dispatch: any, done) {
    console.log("******************");
    const response = await new ApiHelper().FetchFromServer(
      ApiRoutes.ADMIN_PROFILE.service,
      ApiRoutes.ADMIN_PROFILE.url,
      ApiRoutes.ADMIN_PROFILE.method,
      ApiRoutes.ADMIN_PROFILE.authenticate,
      undefined,
      undefined
    );
    console.log(response);
    if (response && !response.isError) {
      console.log("dfdsfdfds");
      const { firstName, lastName, email, _id } = response.data.data;
      dispatch(
        profileInfoSuccess({
          profileInfo: {
            firstName,
            lastName,
            email,
            _id
          }
        })
      );
      done();
    } else {
      console.log(response);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(response.messages[0]);
      }
      localStorage.removeItem("token");
      dispatch(
        profileInfoFailed({
          error: response.messages[0],
          isError: true
        })
      );
      dispatch(redirectTo({ path: AppRoutes.LOGIN }));
      done();
    }
  }
});

const updateProfileLogic = createLogic({
  type: ProfileActionTypes.PROFILE_UPDATE_REQUEST,
  async process(data, dispatch: any, done) {
    dispatch(showLoader());
    const action: any = data.action;
    console.log("******************");
    const response = await new ApiHelper().FetchFromServer(
      ApiRoutes.ADMIN_PROFILE_UPDATE.service,
      ApiRoutes.ADMIN_PROFILE_UPDATE.url,
      ApiRoutes.ADMIN_PROFILE_UPDATE.method,
      ApiRoutes.ADMIN_PROFILE_UPDATE.authenticate,
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
      dispatch(
        profileupdateSuccess({
          profileInfo: action.payload
        })
      );
      done();
    } else {
      console.log(response);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(response.messages[0]);
      }
      dispatch(hideLoader());
      dispatch(
        profileupdateFailed({
          error: response.messages[0]
        })
      );
      done();
    }
  }
});

export const ProfileInfoLogics = [profileInfoLogic, updateProfileLogic];
