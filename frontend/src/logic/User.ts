import { createLogic } from "redux-logic";
import { toast } from "react-toastify";
import { ApiHelper } from "../helper/ApiHelper";
import { ApiRoutes, AppRoutes } from "../config";
import { UserActionTypes, showLoader, hideLoader, getUserSuccess, getUserFailed, addUserSuccess, addUserFailed, userInfoSuccess, userInfoFailed, redirectTo, updateUserSuccess, updateUserFailed, getUserRequest, userStatusSuccess, userStatusFailed } from "../actions";
import { IRootState } from "../interfaces";

let toastId: any = null;

const getUsers = createLogic({
  type: UserActionTypes.GET_USER_REQUEST,
  async process(data, dispatch: any, done) {
    console.log("******************");
    dispatch(showLoader());
    const response = await new ApiHelper().FetchFromServer(
      ApiRoutes.GET_USER.service,
      ApiRoutes.GET_USER.url,
      ApiRoutes.GET_USER.method,
      ApiRoutes.GET_USER.authenticate,
      undefined,
      undefined
    );
    console.log(response);
    if (response && !response.isError) {
      console.log("dfdsfdfds");
      dispatch(hideLoader());
      dispatch(
        getUserSuccess({
          userData: response.data.data
        })
      );
      done();
    } else {
      console.log(response);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(response.messages[0]);
      }
      dispatch(hideLoader());
      dispatch(getUserFailed());
      done();
    }
  }
});

const addUser = createLogic({
  type: UserActionTypes.ADD_USER_REQUEST,
  async process(data, dispatch: any, done) {
    const action: any = data.action;
    console.log("******************");
    dispatch(showLoader());
    const response = await new ApiHelper().FetchFromServer(
      ApiRoutes.ADD_USER.service,
      ApiRoutes.ADD_USER.url,
      ApiRoutes.ADD_USER.method,
      ApiRoutes.ADD_USER.authenticate,
      undefined,
      action.payload
    );
    console.log(response);
    if (response && !response.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.success(response.messages[0]);
      }
      dispatch(hideLoader());
      dispatch(
        addUserSuccess({
          userData: response.data.data
        })
      );
      dispatch(redirectTo({
        path:AppRoutes.USER
      }))
      done();
    } else {
      console.log(response);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(response.messages[0]);
      }
      dispatch(hideLoader());
      dispatch(addUserFailed());
      done();
    }
  }
});

const updateUser = createLogic({
  type: UserActionTypes.UPDATE_USER_REQUEST,
  async process(data, dispatch: any, done) {
    const action: any = data.action;
    console.log("******************");
    dispatch(showLoader());
    const response = await new ApiHelper().FetchFromServer(
      ApiRoutes.UPDATE_USER.service,
      ApiRoutes.UPDATE_USER.url,
      ApiRoutes.UPDATE_USER.method,
      ApiRoutes.UPDATE_USER.authenticate,
      undefined,
      action.payload
    );
    console.log(response);
    if (response && !response.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.success(response.messages[0]);
      }
      dispatch(hideLoader());
      dispatch(
        updateUserSuccess({
          userInfo: response.data.data
        })
      );
      dispatch(redirectTo({
        path:AppRoutes.USER
      }))
      done();
    } else {
      console.log(response);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(response.messages[0]);
      }
      dispatch(hideLoader());
      dispatch(updateUserFailed());
      done();
    }
  }
});

const viewUser = createLogic({
  type: UserActionTypes.USER_INFO_REQUEST,
  async process(data, dispatch: any, done) {
    console.log("******************");
    const action: any = data.action;
    dispatch(showLoader());
    const response = await new ApiHelper().FetchFromServer(
      ApiRoutes.VIEW_USER.service,
      ApiRoutes.VIEW_USER.url,
      ApiRoutes.VIEW_USER.method,
      ApiRoutes.VIEW_USER.authenticate,
      action.payload,
      undefined
    );
    console.log(response);
    if (response && !response.isError) {
      console.log("dfdsfdfds");
      dispatch(hideLoader());
      dispatch(
        userInfoSuccess({
          userInfo: response.data.data
        })
      );
      done();
    } else {
      console.log(response);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(response.messages[0]);
      }
      dispatch(hideLoader());
      dispatch(userInfoFailed());
      done();
    }
  }
});


/**
|--------------------------------------------------
| Update Student Status
|--------------------------------------------------
*/

const updateUserStatus = createLogic({
  type: UserActionTypes.UPDATE_USER_STATUS_REQUEST,
  async process(data, dispatch: any, done) {
    const action: any = data.action
    toast.dismiss();
    dispatch(showLoader());
    const response = await new ApiHelper().FetchFromServer(
      ApiRoutes.UPDATE_USER_STATUS.service,
      ApiRoutes.UPDATE_USER_STATUS.url,
      ApiRoutes.UPDATE_USER_STATUS.method,
      ApiRoutes.UPDATE_USER_STATUS.authenticate,
      undefined,
      action.payload,
    )
    if (response && !response.isError) {
      dispatch(hideLoader())
      if (!toast.isActive(toastId)) {
        toastId = toast.success(response.messages[0])
        dispatch(userStatusSuccess())
      }
      const state: IRootState = data.getState() as IRootState;
      dispatch(
        userInfoSuccess({
          userData: {
            ...state.userReducer.userInfo,
            isActive: action.payload.isActive,
          },
        }),
      );
      dispatch(getUserRequest({ skip: 0, limit: 10 }));
    }
    else {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(response.messages[0]);
      }
      dispatch(hideLoader());
      dispatch(
        userStatusFailed({
          error: response.messages[0],
        }),
      );
      done();
    }
  }
})

export const userLogics = [getUsers, addUser, viewUser, updateUser, updateUserStatus];
