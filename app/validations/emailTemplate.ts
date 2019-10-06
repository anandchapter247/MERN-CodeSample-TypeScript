import { body, ValidationChain } from 'express-validator';

export const EmailTemplateValidation: ValidationChain[] = [
  body('templateName')
    .not()
    .isEmpty()
    .withMessage('Please enter template name.')
    .trim(),
  body('subject')
    .not()
    .isEmpty()
    .withMessage('Please enter subject.')
    .trim(),
  body('htmlContent')
    .not()
    .isEmpty()
    .withMessage('Please enter content')
    .trim()
];
