"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.StudentValidation = [
    express_validator_1.body('firstName')
        .not()
        .isEmpty()
        .withMessage('Please enter first name.')
        .trim(),
    express_validator_1.body('lastName')
        .not()
        .isEmpty()
        .withMessage('Please enter last name')
        .trim(),
    express_validator_1.body('email')
        .not()
        .isEmpty()
        .withMessage('Please enter email address.')
        .trim()
        .isEmail()
        .withMessage('Please enter valid email address'),
    express_validator_1.body('phoneNumber')
        .not()
        .isEmpty()
        .withMessage('Please enter phone number.')
        .trim()
        .trim()
        .isLength({ min: 7, max: 14 })
        .withMessage('Phone number must be at least 7-14 character long.'),
];
