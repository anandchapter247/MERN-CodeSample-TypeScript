import { body, ValidationChain } from 'express-validator';

export const QuizValidation: ValidationChain[] = [
  body('quizName').not().isEmpty().withMessage("Please enter quiz name.")
]