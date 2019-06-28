import { body, ValidationChain } from "express-validator";
/**
 *
 */
export const LoginValidation: ValidationChain[] = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("")
    .trim()
];
