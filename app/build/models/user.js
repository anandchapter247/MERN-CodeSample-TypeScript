"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    salt: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    zipCode: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    verifyToken: {
        type: String,
    },
    userRole: {
        type: String,
        enum: ['Organization', 'Student'],
    },
    loggedInIp: {
        type: String,
    },
    loginToken: {
        type: String,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    updatedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
exports.UserModel = mongoose_1.model('user', UserSchema);
