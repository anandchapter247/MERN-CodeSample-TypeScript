import { createLogic } from 'redux-logic';
import { toast } from 'react-toastify';
import {
  showLoader,
  hideLoader,
  TemplateActionTypes,
  addTemplateSuccess,
  addTemplateFailed,
  updateTemplateSuccess,
  updateTemplateFailed,
} from '../actions';
import { ApiHelper } from '../Helper/ApiHelper';
import { ApiRoutes } from '../config';

let toastId: any = null;

const addTemplate = createLogic({
  type: TemplateActionTypes.ADD_TEMPLATE_REQUEST,
  async process(data, dispatch: any, done) {
    console.log('******************');
    const action:any = data.action;
    dispatch(showLoader());
    const response = await new ApiHelper().FetchFromServer(
      ApiRoutes.ADD_TEMPLATE.service,
      ApiRoutes.ADD_TEMPLATE.url,
      ApiRoutes.ADD_TEMPLATE.method,
      ApiRoutes.ADD_TEMPLATE.authenticate,
      undefined,
      action.payload,
    );
    console.log(response);
    if (response && !response.isError) {
      console.log('dfdsfdfds');
      dispatch(hideLoader());
      dispatch(
        addTemplateSuccess({
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
      dispatch(addTemplateFailed());
      done();
    }
  },
});

const updateTemplate = createLogic({
    type: TemplateActionTypes.UPDATE_TEMPLATE_REQUEST,
    async process(data, dispatch: any, done) {
      console.log('******************');
      const action:any = data.action;
      dispatch(showLoader());
      const response = await new ApiHelper().FetchFromServer(
        ApiRoutes.UPDATE_TEMPLATE.service,
        ApiRoutes.UPDATE_TEMPLATE.url,
        ApiRoutes.UPDATE_TEMPLATE.method,
        ApiRoutes.UPDATE_TEMPLATE.authenticate,
        undefined,
        action.payload,
      );
      console.log(response);
      if (response && !response.isError) {
        console.log('dfdsfdfds');
        dispatch(hideLoader());
        dispatch(
          updateTemplateSuccess({
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
        dispatch(updateTemplateFailed());
        done();
      }
    },
});

export const TemplateLogics = [addTemplate,updateTemplate];
