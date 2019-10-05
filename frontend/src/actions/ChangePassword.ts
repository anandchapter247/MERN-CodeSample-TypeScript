import { createAction } from 'redux-actions';

export enum ChangePasswordActionTypes {
  CHANGE_PASSWORD_REQUEST = 'Change password Requested!',
  CHANGE_PASSWORD_SUCCESS = 'Change password successfully!',
  CHANGE_PASSWORD_FAILED = 'Change password failed!',
}
export const changePasswordRequest = createAction(
  ChangePasswordActionTypes.CHANGE_PASSWORD_REQUEST,
);
export const changePasswordSuccess = createAction(
  ChangePasswordActionTypes.CHANGE_PASSWORD_SUCCESS,
);
export const changePasswordFailed = createAction(
  ChangePasswordActionTypes.CHANGE_PASSWORD_FAILED,
);
