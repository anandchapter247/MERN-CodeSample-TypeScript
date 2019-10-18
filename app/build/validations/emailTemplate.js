"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.EmailTemplateValidation = [
    express_validator_1.body('templateName')
        .not()
        .isEmpty()
        .withMessage('Please enter template name.')
        .trim(),
    express_validator_1.body('subject')
        .not()
        .isEmpty()
        .withMessage('Please enter subject.')
        .trim(),
    express_validator_1.body('htmlContent')
        .not()
        .isEmpty()
        .withMessage('Please enter content')
        .trim()
];
