import { body, ValidationChain } from "express-validator";
/**
 *
 */
export const LoginValidation: ValidationChain[] = [
  body("email").not().isEmpty().withMessage("Please enter email address.").trim().isEmail().withMessage("Please enter valid email address"),
  body("password").not().isEmpty().withMessage("Please enter password.").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 character long.")
];

export const SignupValidation: ValidationChain[] = [
  body("firstName").not().isEmpty().withMessage("Please enter first name.").trim(),
  body("lastName").not().isEmpty().withMessage("Please enter last name.").trim(),
  body("email").not().isEmpty().withMessage("Please enter email address.").trim().isEmail().withMessage("Please enter valid email address"),
  body("password").not().isEmpty().withMessage("Please enter password.").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 character long.")
];

export const ProfileValidation: ValidationChain[] = [
  body("firstName").not().isEmpty().withMessage("Please enter first name.").trim(),
  body("lastName").not().isEmpty().withMessage("Please enter last name").trim(),
  body("email").not().isEmpty().withMessage("Please enter email address.").trim().isEmail().withMessage("Please enter valid email address"),
];

export const ChangePasswordValidation: ValidationChain[] = [
  body("oldPassword").not().isEmpty().withMessage("Please enter old password.").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 character long."),
  body("newPassword").not().isEmpty().withMessage("Please enter password.").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 character long.")
];

export const ForgotPassValidation: ValidationChain[] = [
  body("email").not().isEmpty().withMessage("Please enter email address.").trim().isEmail().withMessage("Please enter valid email address"),
];


export const ResetPasswordValidation: ValidationChain[] = [
  body("password").not().isEmpty().withMessage("Please enter old password.").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 character long."),
];