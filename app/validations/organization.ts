import { body, ValidationChain } from 'express-validator';

export const OrganizationValidation: ValidationChain[] = [
  body('organizationName')
    .not()
    .isEmpty()
    .withMessage('Please enter organization name.')
    .trim(),
  body('firstName')
    .not()
    .isEmpty()
    .withMessage('Please enter first name.')
    .trim(),
  body('lastName')
    .not()
    .isEmpty()
    .withMessage('Please enter last name')
    .trim(),
  body('email')
    .not()
    .isEmpty()
    .withMessage('Please enter email address.')
    .trim()
    .isEmail()
    .withMessage('Please enter valid email address'),
  body('phoneNumber')
    .not()
    .isEmpty()
    .withMessage('Please enter phone number.')
    .trim()
    .trim()
    .isLength({ min: 7, max: 14 })
    .withMessage('Phone number must be at least 7-14 character long.'),
  // body("courseId").not().isEmpty().withMessage("Please enter course.").trim(),
  body('wildCardDomain')
    .not()
    .isEmpty()
    .withMessage('Please enter wilerd card domain.')
    .trim(),
];
