import { handleActions } from 'redux-actions';
import { OrganizationActionTypes } from './../actions';
import { OrganizationInitialState } from '../states';
import { IOrganizationModel } from '../interfaces/Organization';

export const organizationReducer = handleActions<IOrganizationModel, any>(
  {
    [OrganizationActionTypes.GET_ORGANIZATION_REQUEST]: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    [OrganizationActionTypes.GET_ORGANIZATION_SUCCESS]: (state, action) => ({
      ...state,
      organizationData: action.payload.organizationData,
      isLoading: false,
    }),
    [OrganizationActionTypes.GET_ORGANIZATION_FAILED]: (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
    }),
  },
  OrganizationInitialState,
);
