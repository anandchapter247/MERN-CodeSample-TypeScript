import { handleActions } from 'redux-actions';
import { FaqActionTypes } from './../actions';
import { IFaqModel } from '../interfaces';
import { FaqInitialState } from '../states';

export const faqReducer = handleActions<IFaqModel, any>(
  {
    [FaqActionTypes.GET_FAQ_REQUEST]: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    [FaqActionTypes.GET_FAQ_SUCCESS]: (state, action) => ({
      ...state,
      faqData: action.payload.faqData,
      totalRecords: action.payload.totalRecords,
      isLoading: false,
    }),
    [FaqActionTypes.GET_FAQ_FAILED]: (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
    }),

    /**
     * Add Student Reducer
     */
    [FaqActionTypes.ADD_FAQ_REQUEST]: (state, action) => ({
      ...state,
      isSuccess: false,
    }),
    [FaqActionTypes.ADD_FAQ_SUCCESS]: (state, action) => ({
      ...state,
      isSuccess: false,
    }),
    [FaqActionTypes.ADD_FAQ_FAILED]: (state, action) => ({
      ...state,
      isSuccess: false,
    }),

    /**
     * Student Details
     */
    [FaqActionTypes.FAQ_INFO_REQUEST]: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    [FaqActionTypes.FAQ_INFO_SUCCESS]: (state, action) => ({
      ...state,
      faqInfo: action.payload.faqInfo,
      isLoading: false,
    }),
    [FaqActionTypes.FAQ_INFO_FAILED]: (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
    }),

    /**
     * Update Student
     */
    [FaqActionTypes.UPDATE_FAQ_REQUEST]: (state, action) => ({
      ...state,
      isSuccess: false,
    }),
    [FaqActionTypes.UPDATE_FAQ_SUCCESS]: (state, action) => ({
      ...state,
      isSuccess: false,
     faqInfo: action.payload.faqInfo,
    }),
    [FaqActionTypes.UPDATE_FAQ_FAILED]: (state, action) => ({
      ...state,
      isSuccess: false,
    }),
  },
  FaqInitialState,
);
