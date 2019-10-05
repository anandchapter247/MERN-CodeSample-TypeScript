import { body, ValidationChain } from "express-validator";
/**
 *
 */
export const CourseValidation: ValidationChain[] = [
  body("courseName").not().isEmpty().withMessage("Please enter course name.").trim().isLength({ max: 120 }).withMessage("Password must be at most 120 character long."),
  body("description").not().isEmpty().withMessage("Please enter description.").trim().isLength({ max: 5000 }).withMessage("Password must be at most 500 character long.")
];