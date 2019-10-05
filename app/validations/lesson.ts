import { body, ValidationChain } from 'express-validator';

export const LessonValidations: ValidationChain[] = [
  body('lessonName')
    .not()
    .isEmpty()
    .withMessage('Please enter Lesson name.')
    .trim(),
  // body('skillTag')
  //   .not()
  //   .isEmpty()
  //   .withMessage('Please select one level tag.')
  //   .trim(),
  body('levelTag')
    .not()
    .isEmpty()
    .withMessage('Please select one skill tag.')
    .trim(),
];
