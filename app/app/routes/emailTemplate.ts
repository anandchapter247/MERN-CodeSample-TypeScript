import express from 'express';
import {
  addTemplate,
  updateTemplate,
  getTemplates,
  viewTemplate,
} from './../controllers';
import { ValidateAdminToken } from '../common';
import { EmailTemplateValidation } from '../validations';

const EmailTemplateRouter: express.Router = express.Router();

EmailTemplateRouter.post(
  '/add',
  ValidateAdminToken,
  EmailTemplateValidation,
  addTemplate,
);
EmailTemplateRouter.get('/get', ValidateAdminToken, getTemplates);
EmailTemplateRouter.get('/view', ValidateAdminToken, viewTemplate);
EmailTemplateRouter.put(
  '/update',
  ValidateAdminToken,
  EmailTemplateValidation,
  updateTemplate,
);

export default EmailTemplateRouter;
