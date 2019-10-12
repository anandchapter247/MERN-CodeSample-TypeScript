import { createAction } from 'redux-actions';

export enum TemplateActionTypes {
  GET_TEMPLATE_REQUEST = 'Request for TEMPLATEs data',
  GET_TEMPLATE_SUCCESS = 'get TEMPLATEs successfully',
  GET_TEMPLATE_FAILURE = 'get TEMPLATEs failed',
  VIEW_TEMPLATE_REQUEST = 'VIEW TEMPLATE Requested!',
  VIEW_TEMPLATE_SUCCESS = 'VIEW TEMPLATE successfully!',
  VIEW_TEMPLATE_FAILED = 'VIEW TEMPLATE failed!',
  ADD_TEMPLATE_REQUEST = 'Request to add template',
  ADD_TEMPLATE_SUCCESS = 'Template added successfully!',
  ADD_TEMPLATE_FAILURE = 'Failed to add template',
  UPDATE_TEMPLATE_REQUEST = 'Request to UPDATE template',
  UPDATE_TEMPLATE_SUCCESS = 'Template updated successfully!',
  UPDATE_TEMPLATE_FAILURE = 'Failed to UPDATE template',
}

// Get Template list
export const getTemplateRequest = createAction(
  TemplateActionTypes.GET_TEMPLATE_REQUEST,
);
export const getTemplateSuccess = createAction(
  TemplateActionTypes.GET_TEMPLATE_SUCCESS,
);
export const getTemplateFailed = createAction(
  TemplateActionTypes.GET_TEMPLATE_FAILURE,
);

// Add template
export const addTemplateRequest = createAction(
  TemplateActionTypes.ADD_TEMPLATE_REQUEST,
);
export const addTemplateSuccess = createAction(
  TemplateActionTypes.ADD_TEMPLATE_SUCCESS,
);
export const addTemplateFailed = createAction(
  TemplateActionTypes.ADD_TEMPLATE_FAILURE,
);

// Update template
export const updateTemplateRequest = createAction(
  TemplateActionTypes.UPDATE_TEMPLATE_REQUEST,
);

export const updateTemplateSuccess = createAction(
  TemplateActionTypes.UPDATE_TEMPLATE_SUCCESS,
);
export const updateTemplateFailed = createAction(
  TemplateActionTypes.UPDATE_TEMPLATE_FAILURE,
);

// View template
export const viewTemplateRequest = createAction(
  TemplateActionTypes.VIEW_TEMPLATE_REQUEST,
);
export const viewTemplateSuccess = createAction(
  TemplateActionTypes.VIEW_TEMPLATE_SUCCESS,
);
export const viewTemplateFailed = createAction(
  TemplateActionTypes.VIEW_TEMPLATE_FAILED,
);
