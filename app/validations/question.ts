import { body, ValidationChain } from 'express-validator';

export const QuestionValidation: ValidationChain[] = [
  body('questionHeading').not().isEmpty().withMessage("Please enter question heading.")
]