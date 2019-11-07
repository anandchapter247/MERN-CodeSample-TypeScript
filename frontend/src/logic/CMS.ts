import { createLogic } from "redux-logic";
import { toast } from "react-toastify";
import {
  showLoader,
  hideLoader,
  redirectTo,
  HomePageActionTypes,
  updateHomePageFailed,
  updateHomePageSuccess,
  viewHomePageSuccess,
  viewHomePageFailed
} from "../actions";
import { ApiHelper } from "../helper/ApiHelper";
import { ApiRoutes, AppRoutes } from "../config";

let toastId: any = null;

const viewHomePage = createLogic({
  type: HomePageActionTypes.VIEW_HOMEPAGE_REQUEST,
  async process(data, dispatch: any, done) {
    const action: any = data.action;
    dispatch(showLoader());
    const response = await new ApiHelper().FetchFromServer(
      ApiRoutes.VIEW_HOME_PAGE.service,
      ApiRoutes.VIEW_HOME_PAGE.url,
      ApiRoutes.VIEW_HOME_PAGE.method,
      ApiRoutes.VIEW_HOME_PAGE.authenticate,
      action.payload,
      undefined
    );
    if (response && !response.isError) {
      const { data } = response.data;
      console.log("data", data);

      dispatch(hideLoader());
      dispatch(
        viewHomePageSuccess({
          homePageInfo: data
        })
      );
      done();
    } else {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(response.messages[0]);
      }
      dispatch(hideLoader());
      dispatch(viewHomePageFailed());
      done();
    }
  }
});

/**
|--------------------------------------------------
| Update Home Page
|--------------------------------------------------
*/

const updateHomePage = createLogic({
  type: HomePageActionTypes.UPDATE_HOMEPAGE_REQUEST,
  async process(data, dispatch: any, done) {
    const action: any = data.action;
    toast.dismiss();
    dispatch(showLoader());
    const response = await new ApiHelper().UploadImage(
      ApiRoutes.UPDATE_HOME_PAGE.service,
      ApiRoutes.UPDATE_HOME_PAGE.url,
      action.payload,
      ["howItWorksSection", "whySection"]
    );
    if (response && !response.isError) {
      const { data } = response.data;
      dispatch(hideLoader());
      if (!toast.isActive(toastId)) {
        toastId = toast.success(response.messages[0]);
      }
      dispatch(
        updateHomePageSuccess({
          moduleData: data
        })
      );
      //dispatch(redirectTo({ path: AppRoutes }));
      done();
    } else {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(response.messages[0]);
      }
      dispatch(hideLoader());
      dispatch(updateHomePageFailed());
      done();
    }
  }
});

export const HomePageLogic = [viewHomePage, updateHomePage];
