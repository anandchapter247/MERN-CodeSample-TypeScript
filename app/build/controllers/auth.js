"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const common_1 = require("../common");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const messages_1 = require("../common/messages");
const { validationResult } = require('express-validator/check');
/**
 * Admin Login
 */
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: common_1.ValidationFormatter(errors.mapped()),
            success: false,
        });
    }
    try {
        const { body } = req;
        const { email, password } = body;
        const result = yield models_1.AdminModel.findOne({
            email: email,
        });
        if (result == null) {
            throw {
                code: 404,
                message: messages_1.message.emailNotFound,
                success: false,
            };
        }
        if (!common_1.comparePassword(password, result.password)) {
            throw {
                code: 400,
                message: 'Password did not match',
                success: false,
            };
        }
        const token = jsonwebtoken_1.sign({
            id: result.id,
            randomKey: common_1.generateSalt(8),
            email: email,
            firstName: result.firstName,
            lastName: result.lastName,
        }, common_1.JWTSecrete, {
            expiresIn: 86400,
        });
        return res.status(200).json({
            responseCode: 200,
            message: 'Logged in Successfully',
            data: result,
            token: token,
        });
    }
    catch (error) {
        console.log(error);
        const code = error.code ? error.code : 500;
        res.status(code).json({
            code: code,
            message: error.message ? error.message : 'Unexpected error occure.',
            success: false,
        });
    }
});
exports.login = login;
/**
 * View Admin Details
 */
const adminDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { currentUser } = req;
        if (currentUser) {
            const result = yield models_1.AdminModel.findById(currentUser.id);
            console.log(result, '+++++++++++');
            return res.status(200).json({
                responseCode: 200,
                data: result,
                success: true,
            });
        }
        else {
            return res.status(404).json({
                responseCode: 404,
                message: 'User not found.',
                success: true,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message ? error.message : 'Unexpected error occure.',
            success: false,
        });
    }
});
exports.adminDetails = adminDetails;
/**
 * Update Admin Profile
 */
const adminProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: common_1.ValidationFormatter(errors.mapped()),
            success: false,
        });
    }
    try {
        const { currentUser, body } = req;
        if (currentUser) {
            const users = yield models_1.AdminModel.find({
                email: body.email,
                _id: {
                    $ne: currentUser.id,
                },
            });
            if (users.length > 0) {
                return res.status(401).json({
                    message: messages_1.message.emailExist,
                    success: false,
                });
            }
            const result = yield models_1.UserModel.update({
                _id: currentUser.id,
            }, {
                $set: {
                    firstName: body.firstName,
                    lastName: body.lastName,
                    email: body.email,
                },
            });
            return res.status(200).json({
                responseCode: 200,
                message: 'Admin profile updated successfully',
                data: result,
                success: true,
            });
        }
        else {
            return res.status(404).json({
                responseCode: 404,
                message: 'User not found',
                success: false,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message ? error.message : 'Unexpected error occure.',
            success: false,
        });
    }
});
exports.adminProfile = adminProfile;
/**
 * Admin ChangePassword
 */
const adminChangePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: common_1.ValidationFormatter(errors.mapped()),
            success: false,
        });
    }
    try {
        const { body, currentUser } = req;
        const users = yield models_1.AdminModel.findOne({
            _id: currentUser ? currentUser.id : undefined,
        });
        if (!common_1.comparePassword(body.oldPassword, users.password)) {
            throw {
                code: 400,
                message: 'Old Password did not match.',
                success: false,
            };
        }
        const salt = common_1.generateSalt();
        body.newPassword = common_1.encryptPassword(body.newPassword, salt);
        if (currentUser) {
            const result = yield models_1.AdminModel.update({
                _id: currentUser.id,
            }, {
                $set: {
                    password: body.newPassword,
                    salt: salt,
                },
            });
            return res.status(200).json({
                responseCode: 200,
                message: 'Password updated successfully.',
                data: result,
                success: true,
            });
        }
        else {
            return res.status(404).json({
                responseCode: 404,
                message: 'User not found',
                success: false,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message ? error.message : 'Unexpected error occure.',
            success: false,
        });
    }
});
exports.adminChangePassword = adminChangePassword;
/**
 * Organization Login
 */
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: common_1.ValidationFormatter(errors.mapped()),
            success: false,
        });
    }
    try {
        const { body } = req;
        const { email, password } = body;
        const result = yield models_1.UserModel.findOne({
            email: email,
            isDeleted: false,
        });
        if (result == null) {
            throw {
                code: 404,
                message: 'Email address not found',
                success: false,
            };
        }
        if (!result.isActive) {
            throw {
                code: 400,
                message: 'Account has been deactivated by super admin.',
                success: false,
            };
        }
        if (!common_1.comparePassword(password, result.password)) {
            throw {
                code: 400,
                message: 'Password did not match',
                success: false,
            };
        }
        result.set({
            loggedInIp: common_1.getIpAddress(req),
            loginToken: common_1.generateSalt(20),
        });
        const tokenData = yield result.save();
        const token = jsonwebtoken_1.sign({
            id: result.id,
            loginToken: tokenData.loginToken,
            email: email,
            firstName: result.firstName,
            lastName: result.lastName,
            phoneNumber: result.phoneNumber,
        }, common_1.JWTSecrete, {
            expiresIn: 86400,
        });
        const users = yield models_1.UserModel.update({
            _id: result.id,
            email: result.email,
        }, {
            $set: {
                lastLogin: new Date(Date.now()),
            },
        });
        console.log('curent', req.currentUser);
        return res.status(200).json({
            responseCode: 200,
            message: 'Loggedin Successfully',
            data: result,
            token: token,
        });
    }
    catch (error) {
        console.log(error);
        const code = error.code ? error.code : 500;
        res.status(code).json({
            code: code,
            message: error.message ? error.message : 'Unexpected error occure.',
            success: false,
        });
    }
});
exports.userLogin = userLogin;
/**
 * Forgot Password
 */
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: common_1.ValidationFormatter(errors.mapped()),
            success: false,
        });
    }
    try {
        const { body } = req;
        const result = yield models_1.UserModel.findOne({
            email: body.email,
            isDeleted: false,
        });
        if (result === null) {
            throw {
                code: 400,
                message: messages_1.message.emailNotFound,
            };
        }
        body.email = common_1.encrypt(result.email);
        body.id = common_1.encrypt(result._id);
        body.verifyToken = common_1.encrypt(result.email + result.id);
        const updateToken = yield models_1.UserModel.update({
            email: result.email,
            _id: result._id,
        }, {
            verifyToken: body.verifyToken,
        });
        const email = new common_1.Email(req);
        yield email.setTemplate('FORGOTPASSWORD', {
            firstName: result.firstName,
            lastName: result.lastName,
            email: body.email,
            _id: body.id,
            verifyToken: body.verifyToken,
            WebURL: config_1.webURL,
        });
        console.log('email', email);
        yield email.sendEmail(result.email);
        return res.status(200).json({
            message: messages_1.message.emaiSent,
            data: updateToken,
            success: true,
        });
        // Fetch email template from db
        // const emailData: any = await EmailTemplateModel.findOne({
        //   templateName: 'Registration',
        // });
        // console.log(emailData, ':::::::::::::::');
        // const email = new Email(req);
        // await email.setTemplate(emailData.htmlContent, {
        //   first_name: 'Aayushi',
        //   email_address: 'ayushij.chapter247@gmail.com',
        //   password: '12345678',
        // });
        // console.log('email', email);
        // await email.sendEmail('ayushij.chapter247@gmail.com');
    }
    catch (error) {
        const code = error.code ? error.code : 500;
        res.status(code).json({
            code: code,
            message: error.message ? error.message : 'Unexpected error occure.',
            success: false,
        });
    }
});
exports.forgotPassword = forgotPassword;
/**
 * Link Verification
 */
const linkVerified = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req;
        query.email = common_1.decrypt(query.user);
        query.id = common_1.decrypt(query.verification);
        const result = yield models_1.UserModel.findOne({
            email: query.email,
            _id: query.id,
            verifyToken: query.token,
            isDeleted: false,
        });
        if (result === null) {
            throw {
                code: 400,
                message: 'Your verification link has been expired.',
                success: false,
            };
        }
        return res.status(200).json({
            message: 'Link verified successfully!',
            data: result,
            success: true,
        });
    }
    catch (error) {
        const code = error.code ? error.code : 500;
        res.status(code).json({
            code: code,
            message: error.message ? error.message : 'Unexpected error occure.',
            success: false,
        });
    }
});
exports.linkVerified = linkVerified;
/**
 * Reset PassWord
 */
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: common_1.ValidationFormatter(errors.mapped()),
            success: false,
        });
    }
    try {
        const { body } = req;
        const email = body.email;
        const id = body._id;
        const verifyToken = body.verifyToken;
        var salt = common_1.generateSalt(6);
        body.salt = salt;
        body.password = common_1.encryptPassword(body.password, salt);
        const result = yield models_1.UserModel.update({
            _id: id,
            email: email,
            verifyToken: verifyToken,
        }, {
            $set: {
                password: body.password,
                // salt: body.salt,
                verifyToken: '',
            },
        }, {
            new: true,
        });
        return res.status(200).json({
            responseCode: 200,
            data: result,
            message: messages_1.message.passwordChanged,
            success: true,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message ? error.message : 'Unexpected error occure.',
            success: false,
        });
    }
});
exports.resetPassword = resetPassword;
/**
 * Admin Proxy Login
 */
const adminProxyLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = body;
    console.log(id);
    try {
        const result = yield models_1.UserModel.findOne({
            _id: id,
            isDeleted: false,
        });
        console.log(result);
        if (!result) {
            return res.status(404).json({
                responseCode: 404,
                message: 'Data not found.',
                success: true,
            });
        }
        result.set({
            loggedInIp: common_1.getIpAddress(req),
            loginToken: common_1.generateSalt(20),
        });
        const tokenData = yield result.save();
        const token = jsonwebtoken_1.sign({
            id: result.id,
            loginToken: tokenData.loginToken,
            email: result.email,
            firstName: result.firstName,
            lastName: result.lastName,
            phoneNumber: result.phoneNumber,
            courseId: result.courseId,
        }, common_1.JWTSecrete, {
            expiresIn: 86400,
        });
        return res.status(200).json({
            responseCode: 200,
            token: token,
            data: result,
            message: 'Login Successful.',
            success: true,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            responsecode: 500,
            message: error.message ? error.message : 'Unexpected error occure.',
            success: false,
        });
    }
});
exports.adminProxyLogin = adminProxyLogin;
/**
|--------------------------------------------------
| Student Login
|--------------------------------------------------
*/
const studentLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: common_1.ValidationFormatter(errors.mapped()),
            success: false,
        });
    }
    try {
        const { body } = req;
        const { email, password } = body;
        const result = yield models_1.UserModel.findOne({
            email: email,
            isDeleted: false,
        });
        if (result == null) {
            throw {
                code: 404,
                message: 'Email address not found',
                success: false,
            };
        }
        if (!result.isActive) {
            throw {
                code: 400,
                message: 'Account has been deactivated by Organization.',
                success: false,
            };
        }
        if (!common_1.comparePassword(password, result.password)) {
            throw {
                code: 400,
                message: 'Password did not match',
                success: false,
            };
        }
        result.set({
            loggedInIp: common_1.getIpAddress(req),
            loginToken: common_1.generateSalt(20),
        });
        const tokenData = yield result.save();
        const token = jsonwebtoken_1.sign({
            id: result.id,
            loginToken: tokenData.loginToken,
            email: email,
            firstName: result.firstName,
            lastName: result.lastName,
            phoneNumber: result.phoneNumber,
        }, common_1.JWTSecrete, {
            expiresIn: 86400,
        });
        const users = yield models_1.UserModel.update({
            _id: result.id,
            email: result.email,
        }, {
            $set: {
                lastLogin: new Date(Date.now()),
            },
        });
        return res.status(200).json({
            responseCode: 200,
            message: 'Loggedin Successfully',
            data: result,
            token: token,
        });
    }
    catch (error) {
        console.log(error);
        const code = error.code ? error.code : 500;
        res.status(code).json({
            code: code,
            message: error.message ? error.message : 'Unexpected error occure.',
            success: false,
        });
    }
});
exports.studentLogin = studentLogin;
/**
 * User ChangePassword
 */
const userChangePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: common_1.ValidationFormatter(errors.mapped()),
            success: false,
        });
    }
    try {
        const { body, currentUser } = req;
        const users = yield models_1.UserModel.findOne({
            _id: currentUser ? currentUser.id : undefined,
        });
        if (!common_1.comparePassword(body.oldPassword, users.password)) {
            throw {
                code: 400,
                message: 'Old Password did not match.',
                success: false,
            };
        }
        const salt = common_1.generateSalt();
        body.newPassword = common_1.encryptPassword(body.newPassword, salt);
        if (currentUser) {
            const result = yield models_1.UserModel.update({
                _id: currentUser.id,
            }, {
                $set: {
                    password: body.newPassword,
                    salt: salt,
                },
            });
            return res.status(200).json({
                responseCode: 200,
                message: 'Password updated successfully.',
                data: result,
                success: true,
            });
        }
        else {
            return res.status(404).json({
                responseCode: 404,
                message: 'User not found',
                success: false,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message ? error.message : 'Unexpected error occure.',
            success: false,
        });
    }
});
exports.userChangePassword = userChangePassword;
