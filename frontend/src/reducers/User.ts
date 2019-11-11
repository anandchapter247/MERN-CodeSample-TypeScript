import { handleActions } from 'redux-actions';
import { UserActionTypes } from './../actions';
import { IUserModel } from '../interfaces';
import { UserInitialState } from '../states';

export const userReducer = handleActions<IUserModel, any>(
  {
    [UserActionTypes.GET_USER_REQUEST]: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    [UserActionTypes.GET_USER_SUCCESS]: (state, action) => ({
      ...state,
      userData: action.payload.userData,
      totalRecords: action.payload.totalRecords,
      isLoading: false,
    }),
    [UserActionTypes.GET_USER_FAILED]: (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
    }),

    /**
     * Add Student Reducer
     */
    [UserActionTypes.ADD_USER_REQUEST]: (state, action) => ({
      ...state,
      isSuccess: false,
    }),
    [UserActionTypes.ADD_USER_SUCCESS]: (state, action) => ({
      ...state,
      isSuccess: false,
    }),
    [UserActionTypes.ADD_USER_FAILED]: (state, action) => ({
      ...state,
      isSuccess: false,
    }),

    /**
     * Student Details
     */
    [UserActionTypes.USER_INFO_REQUEST]: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    [UserActionTypes.USER_INFO_SUCCESS]: (state, action) => ({
      ...state,
      userInfo: action.payload.userInfo,
      isLoading: false,
    }),
    [UserActionTypes.USER_INFO_FAILED]: (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
    }),

    /**
     * Update Student
     */
    [UserActionTypes.UPDATE_USER_REQUEST]: (state, action) => ({
      ...state,
      isSuccess: false,
    }),
    [UserActionTypes.UPDATE_USER_SUCCESS]: (state, action) => ({
      ...state,
      isSuccess: false,
     userInfo: action.payload.userInfo,
    }),
    [UserActionTypes.UPDATE_USER_FAILED]: (state, action) => ({
      ...state,
      isSuccess: false,
    }),
  },
  UserInitialState,
);
