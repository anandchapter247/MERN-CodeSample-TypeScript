import { body, ValidationChain } from 'express-validator';

export const ModuleValidations: ValidationChain[] = [
  body('moduleName')
    .not()
    .isEmpty()
    .withMessage('Please enter Module name.')
    .trim(),
  body('description')
    .not()
    .isEmpty()
    .withMessage('Please enter Module Description.')
    .trim(),
  // body('courseId').custom(course => {
  //   console.log('fgdfgdf');
  //   console.log(course.length);

  //   if (!course.length) {
  //     throw new Error('Please assign these modules to any course');
  //   }
  // }),
];
