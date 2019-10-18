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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./../models");
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = require("jsonwebtoken");
const password_1 = require("./password");
/**
 *
 */
exports.GenerateToken = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.sign(data, password_1.JWTSecrete, {
            expiresIn: 86400,
        }, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });
});
/**
 *
 */
exports.ValidateAdminToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['authorization']
        ? req.headers['authorization'].toString()
        : '';
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized, Please provide authentication token!',
        });
    }
    try {
        const tokenData = jsonwebtoken_1.verify(token, password_1.JWTSecrete);
        const currentUser = yield models_1.AdminModel.findOne({
            _id: mongoose_1.default.Types.ObjectId(tokenData.id),
        });
        req.currentUser = currentUser;
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: 'Token has expired',
        });
    }
});
/**
 * User Token
 */
exports.ValidateUserToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['authorization']
        ? req.headers['authorization'].toString()
        : '';
    console.log(token, '|||||||||||||||');
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized, Please provide authentication token!',
        });
    }
    try {
        const tokenData = jsonwebtoken_1.verify(token, password_1.JWTSecrete);
        console.log(tokenData, '|||||||tokenData||||||||');
        const currentUser = yield models_1.UserModel.findOne({
            isDeleted: false,
            _id: mongoose_1.default.Types.ObjectId(tokenData.id),
        });
        console.log(currentUser, '|||||||currentUser||||||||');
        req.currentUser = currentUser;
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: 'Your login session has been expired, Please login again.',
        });
    }
});
