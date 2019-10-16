import { createAction } from 'redux-actions';

export enum HomePageActionTypes {
  VIEW_HOMEPAGE_REQUEST = 'Request for HomePage VIEW',
  VIEW_HOMEPAGE_SUCCESS = 'HomePage VIEW successfully',
  VIEW_HOMEPAGE_FAILURE = 'HomePage view failed',
  UPDATE_HOMEPAGE_REQUEST = 'Request for HomePage updation',
  UPDATE_HOMEPAGE_SUCCESS = 'Update HomePage successfully',
  UPDATE_HOMEPAGE_FAILURE = 'Update HomePage failed',
}

// View HomePage
export const viewHomePageRequest = createAction(
  HomePageActionTypes.VIEW_HOMEPAGE_REQUEST,
);
export const viewHomePageSuccess = createAction(
  HomePageActionTypes.VIEW_HOMEPAGE_SUCCESS,
);
export const viewHomePageFailed = createAction(
  HomePageActionTypes.VIEW_HOMEPAGE_FAILURE,
);


// Update HomePage
export const updateHomePageRequest = createAction(
  HomePageActionTypes.UPDATE_HOMEPAGE_REQUEST,
);
export const updateHomePageSuccess = createAction(
  HomePageActionTypes.UPDATE_HOMEPAGE_SUCCESS,
);
export const updateHomePageFailed = createAction(
  HomePageActionTypes.UPDATE_HOMEPAGE_FAILURE,
);




