"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
exports.AppURL = "";
exports.ENVEnum = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
};
exports.FrontImageUploadPath = path_1.default.join('/', 'assets', 'frontend_images');
exports.Environment = process.env.NODE_ENV || exports.ENVEnum.DEVELOPMENT;
exports.webURL = exports.Environment == exports.ENVEnum.DEVELOPMENT
    ? 'http://192.168.2.138:3000'
    : 'http://dev.drpolly.com';
