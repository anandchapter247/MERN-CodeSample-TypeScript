import { body, ValidationChain } from 'express-validator';
export const settingsValidation: ValidationChain[] = [
  body('email')
    .isEmail()
    .withMessage('Please enter valid email address')
    .trim(),
  body('adminEmail')
    .isEmail()
    .withMessage('Please enter valid email address')
    .trim(),
  body('supportEmail')
    .isEmail()
    .withMessage('Please enter valid email address')
    .trim(),
  body('address')
    .isLength({ max: 100 })
    .withMessage('Address must be at less than 100 characters.')
    .trim(),
  body('phone')
    .isLength({ min: 7, max: 14 })
    .withMessage('Phone number must be at least 7-14 character long.')
    .trim(),
];
