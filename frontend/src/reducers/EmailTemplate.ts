import { handleActions } from 'redux-actions';
import { TemplateActionTypes } from '../actions';
import { TemplateInitialState } from '../states';

export const templateReducer = handleActions<any, any>(
  {
    [TemplateActionTypes.GET_TEMPLATE_REQUEST]: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    [TemplateActionTypes.GET_TEMPLATE_SUCCESS]: (state, action) => ({
      ...state,
      templateData: action.payload.templateData,
      isLoading: false,
    }),
    [TemplateActionTypes.GET_TEMPLATE_FAILURE]: (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
    }),
    [TemplateActionTypes.ADD_TEMPLATE_REQUEST]: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    [TemplateActionTypes.ADD_TEMPLATE_SUCCESS]: (state, action) => ({
      ...state,
      templateInfo: action.payload.templateInfo,
      isLoading: false,
    }),
    [TemplateActionTypes.ADD_TEMPLATE_FAILURE]: (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
    }),
    [TemplateActionTypes.UPDATE_TEMPLATE_REQUEST]: (state, action) => ({
      ...state,
      isError: false,
    }),
    [TemplateActionTypes.UPDATE_TEMPLATE_SUCCESS]: (state, action) => ({
      ...state,
      templateInfo: action.payload.templateInfo,
      isError: false,
    }),
    [TemplateActionTypes.UPDATE_TEMPLATE_FAILURE]: (state, action) => ({
      ...state,
      isError: true,
    }),
    [TemplateActionTypes.VIEW_TEMPLATE_REQUEST]: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    [TemplateActionTypes.VIEW_TEMPLATE_SUCCESS]: (state, action) => ({
      ...state,
      templateInfo: action.payload.templateInfo,
      isLoading: false,
    }),
    [TemplateActionTypes.VIEW_TEMPLATE_FAILED]: (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
    }),
  },
  TemplateInitialState,
);
