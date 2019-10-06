import { createAction } from 'redux-actions';

export enum TemplateActionTypes {
  ADD_TEMPLATE_REQUEST = 'Request to add template',
  ADD_TEMPLATE_SUCCESS = 'Template added successfully!',
  ADD_TEMPLATE_FAILURE = 'Failed to add template',
  UPDATE_TEMPLATE_REQUEST = 'Request to UPDATE template',
  UPDATE_TEMPLATE_SUCCESS = 'Template updated successfully!',
  UPDATE_TEMPLATE_FAILURE = 'Failed to UPDATE template',
}
// Add template
export const addTemplateRequest = createAction(
  TemplateActionTypes.ADD_TEMPLATE_REQUEST,
);

export const addTemplateSuccess = createAction(TemplateActionTypes.ADD_TEMPLATE_SUCCESS);
export const addTemplateFailed = createAction(TemplateActionTypes.ADD_TEMPLATE_FAILURE);

// Update template
export const updateTemplateRequest = createAction(
    TemplateActionTypes.UPDATE_TEMPLATE_REQUEST,
  );
  
  export const updateTemplateSuccess = createAction(TemplateActionTypes.UPDATE_TEMPLATE_SUCCESS);
  export const updateTemplateFailed = createAction(TemplateActionTypes.UPDATE_TEMPLATE_FAILURE);