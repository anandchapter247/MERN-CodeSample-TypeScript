import { handleActions } from 'redux-actions';
import { ProfileActionTypes } from './../actions';
import { ProfileInitialState } from '../states';
import { IProfileModal } from '../interfaces/Profile';

export const profileInfoReducer = handleActions<IProfileModal, any>(
  {
    [ProfileActionTypes.PROFILE_INFO_REQUEST]: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    [ProfileActionTypes.PROFILE_INFO_SUCCESS]: (state, action) => ({
      ...state,
      profileInfo: action.payload.profileInfo,
      isLoading: false,
    }),
    [ProfileActionTypes.PROFILE_INFO_FAILED]: (state, action) => ({
      ...state,
      profileInfo: action.payload.profileInfo,
      isLoading: false,
      isError: true,
    }),
    [ProfileActionTypes.PROFILE_UPDATE_REQUEST]: (state, action) => ({
      ...state,
      isError: false,
    }),
    [ProfileActionTypes.PROFILE_UPDATE_SUCCESS]: (state, action) => ({
      ...state,
      profileInfo: action.payload.profileInfo,
      isError: false,
    }),
    [ProfileActionTypes.PROFILE_UPDATE_FAILED]: (state, action) => ({
      ...state,
      isError: true,
    }),
  },
  ProfileInitialState,
);
