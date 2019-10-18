"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
/**
 * Encrypt the password using bcrypt algo
 */
const encryptPassword = (password, salt) => {
    return bcrypt_1.default.hashSync(password, salt);
};
exports.encryptPassword = encryptPassword;
/**
 * Compare the password using bcrypt algo
 */
const comparePassword = (password, hash) => {
    return bcrypt_1.default.compareSync(password, hash);
};
exports.comparePassword = comparePassword;
/**
 * Generates Salt for the password
 */
const generateSalt = (length = 10) => {
    return bcrypt_1.default.genSaltSync(length);
};
exports.generateSalt = generateSalt;
/**
 * Encrypt Email and Id
 */
var algorithm = "aes-256-cbc";
var password = "password";
const encrypt = (text) => {
    const cipher = crypto_1.default.createCipher(algorithm, password);
    var crypted = cipher.update(text.toString(), "utf8", "hex");
    crypted += cipher.final("hex");
    return crypted;
};
exports.encrypt = encrypt;
/**
|--------------------------------------------------
| Dycript Email and Id
|--------------------------------------------------
*/
const decrypt = (text) => {
    const decipher = crypto_1.default.createDecipher(algorithm, password);
    var dec = decipher.update(text, "hex", "utf8");
    dec += decipher.final("utf8");
    return dec;
};
exports.decrypt = decrypt;
/**
 *
 */
const JWTSecrete = "qwertyuiop[]lkjhgfdazxcvbnm,./!@#$%^&*()";
exports.JWTSecrete = JWTSecrete;
/* Function to get client IP */
const getIpAddress = (req) => {
    var ip = null;
    try {
        ip =
            (req.headers["x-forwarded-for"] || "").split(",").pop() ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress;
    }
    catch (ex) {
        console.log(ex);
        ip = null;
    }
    return ip;
};
exports.getIpAddress = getIpAddress;
