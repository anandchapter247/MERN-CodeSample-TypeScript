import { handleActions } from 'redux-actions';
import { HomePageActionTypes } from '../actions';
import { IHomePageModel } from '../interfaces';
import { HomePageInitialState } from '../states';

export const homePageReducer = handleActions<IHomePageModel, any>(
  {
    [HomePageActionTypes.VIEW_HOMEPAGE_REQUEST]: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    [HomePageActionTypes.VIEW_HOMEPAGE_SUCCESS]: (state, action) => ({
      ...state,
      homePageInfo: action.payload.homePageInfo,
      isLoading: false,
    }),
    [HomePageActionTypes.VIEW_HOMEPAGE_FAILURE]: (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
    }),
    [HomePageActionTypes.UPDATE_HOMEPAGE_REQUEST]: (state, action) => ({
      ...state,
    }),
    [HomePageActionTypes.UPDATE_HOMEPAGE_SUCCESS]: (state, action) => ({
      ...state,
      homePageInfo: action.payload.homePageData,
    }),
    [HomePageActionTypes.UPDATE_HOMEPAGE_FAILURE]: (state, action) => ({
      ...state,
      isError: true,
    }),
  },
  HomePageInitialState,
);
