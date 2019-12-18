import { body, check, ValidationChain } from 'express-validator/check';
import { message } from '../common';
/**
 *
 */
export const LoginValidation: ValidationChain[] = [
  body('email')
    .not()
    .isEmpty()
    .withMessage(message.RequiredEmail)
    .trim()
    .isEmail()
    .withMessage(message.InvalidEmail),
  body('password')
    .not()
    .isEmpty()
    .withMessage(message.RequiredPassword)
    .trim()
    .isLength({ min: 6 })
    .withMessage(message.MinPasswordLength),
];

export const SignupValidation: ValidationChain[] = [
  body('firstName')
    .not()
    .isEmpty()
    .withMessage(message.RequiredFirstName)
    .trim(),
  body('lastName')
    .not()
    .isEmpty()
    .withMessage(message.RequiredLastName)
    .trim(),
  body('email')
    .not()
    .isEmpty()
    .withMessage(message.RequiredEmail)
    .trim()
    .isEmail()
    .withMessage(message.InvalidEmail),
  body('password')
    .not()
    .isEmpty()
    .withMessage(message.RequiredPassword)
    .trim()
    .isLength({ min: 6 })
    .withMessage(message.MinPasswordLength),
  check('confirmPassword')
    .not()
    .isEmpty()
    .withMessage(message.RequiredRePassword)
    .trim()
    .isLength({ min: 6 })
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(message.PasswordMatchError);
      } else {
        return value;
      }
    }),
];

export const ProfileValidation: ValidationChain[] = [
  body('firstName')
    .not()
    .isEmpty()
    .withMessage(message.RequiredFirstName)
    .trim(),
  body('lastName')
    .not()
    .isEmpty()
    .withMessage(message.RequiredLastName)
    .trim(),
  body('email')
    .not()
    .isEmpty()
    .withMessage(message.RequiredEmail)
    .trim()
    .isEmail()
    .withMessage(message.InvalidEmail),
];

export const ChangePasswordValidation: ValidationChain[] = [
  body('oldPassword')
    .not()
    .isEmpty()
    .withMessage(message.RequiredOldPassword)
    .trim()
    .isLength({ min: 6 })
    .withMessage(message.MinPasswordLength),
  body('newPassword')
    .not()
    .isEmpty()
    .withMessage(message.RequiredPassword)
    .trim()
    .isLength({ min: 6 })
    .withMessage(message.MinPasswordLength),
];

export const ForgotPassValidation: ValidationChain[] = [
  body('email')
    .not()
    .isEmpty()
    .withMessage(message.RequiredEmail)
    .trim()
    .isEmail()
    .withMessage(message.InvalidEmail),
];

export const ResetPasswordValidation: ValidationChain[] = [
  body('password')
    .not()
    .isEmpty()
    .withMessage(message.RequiredOldPassword)
    .trim()
    .isLength({ min: 6 })
    .withMessage(message.MinPasswordLength),
  check('confirmPassword')
    .not()
    .isEmpty()
    .withMessage(message.RequiredOldPassword)
    .trim()
    .isLength({ min: 6 })
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(message.PasswordMatchError);
      } else {
        return value;
      }
    }),
];
