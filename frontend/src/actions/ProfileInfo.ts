import { createAction } from 'redux-actions';

export enum ProfileActionTypes {
  PROFILE_INFO_REQUEST = 'ProfileInfo Requested!',
  PROFILE_INFO_SUCCESS = 'ProfileInfo successfully!',
  PROFILE_INFO_FAILED = 'ProfileInfo failed!',
  PROFILE_UPDATE_REQUEST = 'Request Profile updation',
  PROFILE_UPDATE_SUCCESS = 'Profile updated successfully',
  PROFILE_UPDATE_FAILED = 'Profile updation failed!',
}
export const profileInfoRequest = createAction(
  ProfileActionTypes.PROFILE_INFO_REQUEST,
);
export const profileInfoSuccess = createAction(
  ProfileActionTypes.PROFILE_INFO_SUCCESS,
);
export const profileInfoFailed = createAction(
  ProfileActionTypes.PROFILE_INFO_FAILED,
);
export const profileupdateRequest = createAction(
  ProfileActionTypes.PROFILE_UPDATE_REQUEST,
);
export const profileupdateSuccess = createAction(
  ProfileActionTypes.PROFILE_UPDATE_SUCCESS,
);
export const profileupdateFailed = createAction(
  ProfileActionTypes.PROFILE_UPDATE_FAILED,
);
