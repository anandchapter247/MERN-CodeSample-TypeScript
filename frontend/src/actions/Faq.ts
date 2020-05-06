import { createAction } from 'redux-actions';

export enum FaqActionTypes {
  GET_FAQ_REQUEST = 'FAQ Requested!',
  GET_FAQ_SUCCESS = 'FAQ data fetch successfully!',
  GET_FAQ_FAILED = 'FAQ request failed!',
  ADD_FAQ_REQUEST = "Add FAQ Request!",
  ADD_FAQ_SUCCESS = "Add FAQ Succesfully!",
  ADD_FAQ_FAILED = "Add FAQ Request Failed!",
  FAQ_INFO_REQUEST = "FAQ info Request!",
  FAQ_INFO_SUCCESS = "FAQ Info Request!",
  FAQ_INFO_FAILED = "FAQ Info Failed!",
  UPDATE_FAQ_REQUEST = "Update FAQ Request!",
  UPDATE_FAQ_SUCCESS = "Update FAQ Success!",
  UPDATE_FAQ_FAILED = "Update FAQ request Failed!",
  UPDATE_FAQ_STATUS_REQUEST = 'UPDATE FAQ success Requested!',
  UPDATE_FAQ_STATUS_SUCCESS = 'UPDATE FAQ_STATUS successfully!',
  UPDATE_FAQ_STATUS_FAILED = 'UPDATE FAQ_STATUS failed!',
}

// get FAQ list
export const getFAQRequest = createAction(
  FaqActionTypes.GET_FAQ_REQUEST,
);
export const getFAQSuccess = createAction(
  FaqActionTypes.GET_FAQ_SUCCESS,
);
export const getFAQFailed = createAction(
  FaqActionTypes.GET_FAQ_FAILED,
);

/**
 * Add FAQ
 */
export const addFAQRequest = createAction(
  FaqActionTypes.ADD_FAQ_REQUEST,
);
export const addFAQSuccess = createAction(
  FaqActionTypes.ADD_FAQ_SUCCESS,
);
export const addFAQFailed = createAction(
  FaqActionTypes.ADD_FAQ_FAILED,
);

/**
 * FAQ Informations
 */
export const FAQInfoRequest = createAction(
  FaqActionTypes.FAQ_INFO_REQUEST,
);
export const FAQInfoSuccess = createAction(
  FaqActionTypes.FAQ_INFO_SUCCESS,
);
export const FAQInfoFailed = createAction(
  FaqActionTypes.FAQ_INFO_FAILED,
);

/**
 * Update FAQ
 */

export const updateFAQRequest = createAction(
  FaqActionTypes.UPDATE_FAQ_REQUEST,
);
export const updateFAQSuccess = createAction(
  FaqActionTypes.UPDATE_FAQ_SUCCESS,
);
export const updateFAQFailed = createAction(
  FaqActionTypes.UPDATE_FAQ_FAILED,
);

/**
 * FAQ Status 
 */
export const FAQStatusRequest = createAction(
  FaqActionTypes.UPDATE_FAQ_STATUS_REQUEST,
);
export const FAQStatusSuccess = createAction(
  FaqActionTypes.UPDATE_FAQ_STATUS_SUCCESS,
);
export const FAQStatusFailed = createAction(
  FaqActionTypes.UPDATE_FAQ_STATUS_FAILED,
);