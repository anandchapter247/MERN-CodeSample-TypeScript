import { createAction } from 'redux-actions';

export enum UserActionTypes {
  GET_USER_REQUEST = 'USER Requested!',
  GET_USER_SUCCESS = 'USER data fetch successfully!',
  GET_USER_FAILED = 'USER request failed!',
  ADD_USER_REQUEST = "Add USER Request!",
  ADD_USER_SUCCESS = "Add USER Succesfully!",
  ADD_USER_FAILED = "Add USER Request Failed!",
  USER_INFO_REQUEST = "USER info Request!",
  USER_INFO_SUCCESS = "USER Info Request!",
  USER_INFO_FAILED = "USER Info Failed!",
  UPDATE_USER_REQUEST = "Update USER Request!",
  UPDATE_USER_SUCCESS = "Update USER Success!",
  UPDATE_USER_FAILED = "Update USER request Failed!",
  UPDATE_USER_STATUS_REQUEST = 'UPDATE USER success Requested!',
  UPDATE_USER_STATUS_SUCCESS = 'UPDATE USER_STATUS successfully!',
  UPDATE_USER_STATUS_FAILED = 'UPDATE User_STATUS failed!',
}

// get user list
export const getUserRequest = createAction(
  UserActionTypes.GET_USER_REQUEST,
);
export const getUserSuccess = createAction(
  UserActionTypes.GET_USER_SUCCESS,
);
export const getUserFailed = createAction(
  UserActionTypes.GET_USER_FAILED,
);

/**
 * Add User
 */
export const addUserRequest = createAction(
  UserActionTypes.ADD_USER_REQUEST,
);
export const addUserSuccess = createAction(
  UserActionTypes.ADD_USER_SUCCESS,
);
export const addUserFailed = createAction(
  UserActionTypes.ADD_USER_FAILED,
);

/**
 * User Informations
 */
export const userInfoRequest = createAction(
  UserActionTypes.USER_INFO_REQUEST,
);
export const userInfoSuccess = createAction(
  UserActionTypes.USER_INFO_SUCCESS,
);
export const userInfoFailed = createAction(
  UserActionTypes.USER_INFO_FAILED,
);

/**
 * Update User
 */

export const updateUserRequest = createAction(
  UserActionTypes.UPDATE_USER_REQUEST,
);
export const updateUserSuccess = createAction(
  UserActionTypes.UPDATE_USER_SUCCESS,
);
export const updateUserFailed = createAction(
  UserActionTypes.UPDATE_USER_FAILED,
);

/**
 * User Status 
 */
export const userStatusRequest = createAction(
  UserActionTypes.UPDATE_USER_STATUS_REQUEST,
);
export const userStatusSuccess = createAction(
  UserActionTypes.UPDATE_USER_STATUS_SUCCESS,
);
export const userStatusFailed = createAction(
  UserActionTypes.UPDATE_USER_STATUS_FAILED,
);