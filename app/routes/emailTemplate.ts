import express from "express";
import { addTemplate, updateTemplate } from "./../controllers";
import { ValidateAdminToken } from "../common";
import { EmailTemplateValidation } from "../validations";

const EmailTemplateRouter: express.Router = express.Router();

EmailTemplateRouter.post("/add", ValidateAdminToken, EmailTemplateValidation, addTemplate);
EmailTemplateRouter.put("/update", ValidateAdminToken, EmailTemplateValidation, updateTemplate);

export default EmailTemplateRouter;
