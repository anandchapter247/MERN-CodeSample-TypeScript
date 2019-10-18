"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("./../controllers");
const common_1 = require("../common");
const validations_1 = require("../validations");
const EmailTemplateRouter = express_1.default.Router();
EmailTemplateRouter.post('/add', common_1.ValidateAdminToken, validations_1.EmailTemplateValidation, controllers_1.addTemplate);
EmailTemplateRouter.get('/get', common_1.ValidateAdminToken, controllers_1.getTemplates);
EmailTemplateRouter.get('/view', common_1.ValidateAdminToken, controllers_1.viewTemplate);
EmailTemplateRouter.put('/update', common_1.ValidateAdminToken, validations_1.EmailTemplateValidation, controllers_1.updateTemplate);
exports.default = EmailTemplateRouter;
