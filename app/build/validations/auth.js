"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
/**
 *
 */
exports.LoginValidation = [
    express_validator_1.body("email").not().isEmpty().withMessage("Please enter email address.").trim().isEmail().withMessage("Please enter valid email address"),
    express_validator_1.body("password").not().isEmpty().withMessage("Please enter password.").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 character long.")
];
exports.ProfileValidation = [
    express_validator_1.body("firstName").not().isEmpty().withMessage("Please enter first name.").trim(),
    express_validator_1.body("lastName").not().isEmpty().withMessage("Please enter last name").trim(),
    express_validator_1.body("email").not().isEmpty().withMessage("Please enter email address.").trim().isEmail().withMessage("Please enter valid email address"),
];
exports.ChangePasswordValidation = [
    express_validator_1.body("oldPassword").not().isEmpty().withMessage("Please enter old password.").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 character long."),
    express_validator_1.body("newPassword").not().isEmpty().withMessage("Please enter password.").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 character long.")
];
exports.ForgotPassValidation = [
    express_validator_1.body("email").not().isEmpty().withMessage("Please enter email address.").trim().isEmail().withMessage("Please enter valid email address"),
];
exports.ResetPasswordValidation = [
    express_validator_1.body("password").not().isEmpty().withMessage("Please enter old password.").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 character long."),
];
