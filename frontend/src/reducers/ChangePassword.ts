import { handleActions } from 'redux-actions';
import { ChangePasswordActionTypes } from './../actions';
import { ChangePasswordInitialstates } from '../states';
import { IChangePasswordModal } from '../interfaces/Profile';

export const changePasswordReducer = handleActions<IChangePasswordModal, any>(
  {
    [ChangePasswordActionTypes.CHANGE_PASSWORD_REQUEST]: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    [ChangePasswordActionTypes.CHANGE_PASSWORD_SUCCESS]: (state, action) => ({
      ...state,
      isError: false,
      isLoading: false,
    }),
    [ChangePasswordActionTypes.CHANGE_PASSWORD_FAILED]: (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
    }),
  },
  ChangePasswordInitialstates,
);
