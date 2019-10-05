import { createAction } from 'redux-actions';

export enum OrganizationActionTypes {
  GET_ORGANIZATION_REQUEST = 'Organization Requested!',
  GET_ORGANIZATION_SUCCESS = 'Organization data fetch successfully!',
  GET_ORGANIZATION_FAILED = 'Organization request failed!',
}
export const getOrganizationRequest = createAction(
  OrganizationActionTypes.GET_ORGANIZATION_REQUEST,
);
export const getOrganizationSuccess = createAction(
  OrganizationActionTypes.GET_ORGANIZATION_SUCCESS,
);
export const getOrganizationFailed = createAction(
  OrganizationActionTypes.GET_ORGANIZATION_FAILED,
);
