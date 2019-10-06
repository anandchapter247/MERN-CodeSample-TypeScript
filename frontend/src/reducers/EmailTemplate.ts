import { handleActions } from 'redux-actions';
import { TemplateActionTypes } from '../actions';
import { TemplateInitialState } from '../states';

export const templateReducer = handleActions<any, any>(
{
    [TemplateActionTypes.ADD_TEMPLATE_REQUEST]: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    [TemplateActionTypes.ADD_TEMPLATE_SUCCESS]: (state, action) => ({
      ...state,
      profileInfo: action.payload.profileInfo,
      isLoading: false,
    }),
    [TemplateActionTypes.ADD_TEMPLATE_FAILURE]: (state, action) => ({
      ...state,
      profileInfo: action.payload.profileInfo,
      isLoading: false,
      isError: true,
    }),
    [TemplateActionTypes.UPDATE_TEMPLATE_REQUEST]: (state, action) => ({
      ...state,
      isError: false,
    }),
    [TemplateActionTypes.UPDATE_TEMPLATE_SUCCESS]: (state, action) => ({
      ...state,
      profileInfo: action.payload.profileInfo,
      isError: false,
    }),
    [TemplateActionTypes.UPDATE_TEMPLATE_FAILURE]: (state, action) => ({
      ...state,
      isError: true,
    }),
  },
  TemplateInitialState,
);
