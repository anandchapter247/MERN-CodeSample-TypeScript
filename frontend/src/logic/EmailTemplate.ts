import { createLogic } from "redux-logic";
import { toast } from "react-toastify";
import {
  showLoader,
  hideLoader,
  TemplateActionTypes,
  addTemplateSuccess,
  addTemplateFailed,
  updateTemplateSuccess,
  updateTemplateFailed,
  viewTemplateSuccess,
  getTemplateSuccess,
  getTemplateFailed,
  redirectTo
} from "../actions";
import { ApiHelper } from "../helper/ApiHelper";
import { ApiRoutes, AppRoutes } from "../config";

let toastId: any = null;

const addTemplate = createLogic({
  type: TemplateActionTypes.ADD_TEMPLATE_REQUEST,
  async process(data, dispatch: any, done) {
    console.log("******************");
    const action: any = data.action;
    dispatch(showLoader());
    const response = await new ApiHelper().FetchFromServer(
      ApiRoutes.ADD_TEMPLATE.service,
      ApiRoutes.ADD_TEMPLATE.url,
      ApiRoutes.ADD_TEMPLATE.method,
      ApiRoutes.ADD_TEMPLATE.authenticate,
      undefined,
      action.payload
    );
    console.log(response);
    if (response && !response.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.success(response.messages[0]);
      }
      dispatch(hideLoader());
      dispatch(
        addTemplateSuccess({
          templateInfo: response.data.data
        })
      );
      dispatch(redirectTo({ path: AppRoutes.EMAILTEMPLATE }));
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
  }
});

const updateTemplate = createLogic({
  type: TemplateActionTypes.UPDATE_TEMPLATE_REQUEST,
  async process(data, dispatch: any, done) {
    console.log("******************");
    const action: any = data.action;
    dispatch(showLoader());
    const response = await new ApiHelper().FetchFromServer(
      ApiRoutes.UPDATE_TEMPLATE.service,
      ApiRoutes.UPDATE_TEMPLATE.url,
      ApiRoutes.UPDATE_TEMPLATE.method,
      ApiRoutes.UPDATE_TEMPLATE.authenticate,
      undefined,
      action.payload
    );
    if (response && !response.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.success(response.messages[0]);
      }
      dispatch(hideLoader());
      dispatch(
        updateTemplateSuccess({
          templateInfo: response.data.data
        })
      );
      dispatch(redirectTo({ path: AppRoutes.EMAILTEMPLATE }));
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
  }
});

const getTemplates = createLogic({
  type: TemplateActionTypes.GET_TEMPLATE_REQUEST,
  async process(data, dispatch: any, done) {
    console.log("******************");
    const action: any = data.action;
    dispatch(showLoader());
    const response = await new ApiHelper().FetchFromServer(
      ApiRoutes.GET_TEMPLATE.service,
      ApiRoutes.GET_TEMPLATE.url,
      ApiRoutes.GET_TEMPLATE.method,
      ApiRoutes.GET_TEMPLATE.authenticate,
      undefined,
      action.payload
    );
    console.log(response);
    if (response && !response.isError) {
      console.log("dfdsfdfds");
      dispatch(hideLoader());
      dispatch(
        getTemplateSuccess({
          templateData: response.data.data
        })
      );
      done();
    } else {
      console.log(response);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(response.messages[0]);
      }
      dispatch(hideLoader());
      dispatch(getTemplateFailed());
      done();
    }
  }
});

const viewTemplate = createLogic({
  type: TemplateActionTypes.VIEW_TEMPLATE_REQUEST,
  async process(data, dispatch: any, done) {
    console.log("******************");
    const action: any = data.action;
    dispatch(showLoader());
    const response = await new ApiHelper().FetchFromServer(
      ApiRoutes.VIEW_TEMPLATE.service,
      ApiRoutes.VIEW_TEMPLATE.url,
      ApiRoutes.VIEW_TEMPLATE.method,
      ApiRoutes.VIEW_TEMPLATE.authenticate,
      action.payload,
      undefined
    );
    console.log(response);
    if (response && !response.isError) {
      console.log("dfdsfdfds");
      dispatch(hideLoader());
      dispatch(
        viewTemplateSuccess({
          templateInfo: response.data.data
        })
      );
      done();
    } else {
      console.log(response);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(response.messages[0]);
      }
      dispatch(hideLoader());
      dispatch(viewTemplateSuccess());
      done();
    }
  }
});

export const TemplateLogics = [
  addTemplate,
  updateTemplate,
  getTemplates,
  viewTemplate
];
