import { body, ValidationChain } from 'express-validator';

export const GroupValidations: ValidationChain[] = [
  body('groupName')
    .not()
    .isEmpty()
    .withMessage('Please enter Group name.')
    .trim()
    .isLength({ max: 80 })
    .withMessage('Name should not be grater than 80'),
  body('description')
    .not()
    .isEmpty()
    .withMessage('Please enter Group Description.')
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description should not be grater than 500'),
];
