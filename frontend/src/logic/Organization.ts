import { createLogic } from 'redux-logic';
import { toast } from 'react-toastify';
import {
  showLoader,
  hideLoader,
  OrganizationActionTypes,
  getOrganizationFailed,
  getOrganizationSuccess,
} from '../actions';
import { ApiHelper } from '../Helper/ApiHelper';
import { ApiRoutes } from '../config';

let toastId: any = null;

const getOrganization = createLogic({
  type: OrganizationActionTypes.GET_ORGANIZATION_REQUEST,
  async process(data, dispatch: any, done) {
    console.log('******************');
    dispatch(showLoader());
    const response = await new ApiHelper().FetchFromServer(
      ApiRoutes.GET_ORGANIZATION.service,
      ApiRoutes.GET_ORGANIZATION.url,
      ApiRoutes.GET_ORGANIZATION.method,
      ApiRoutes.GET_ORGANIZATION.authenticate,
      undefined,
      undefined,
    );
    console.log(response);
    if (response && !response.isError) {
      console.log('dfdsfdfds');
      dispatch(hideLoader());
      dispatch(
        getOrganizationSuccess({
          organizationData: response.data.data,
        }),
      );
      done();
    } else {
      console.log(response);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(response.messages[0]);
      }
      dispatch(hideLoader());
      dispatch(getOrganizationFailed());
      done();
    }
  },
});

export const getOrganizationLogics = [getOrganization];
