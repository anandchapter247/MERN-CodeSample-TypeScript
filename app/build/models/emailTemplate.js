"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EmailTemplateSchema = new mongoose_1.Schema({
    templateName: {
        type: String,
    },
    subject: {
        type: String,
    },
    htmlContent: {
        type: String,
    },
    designContent: {
        type: Object,
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
exports.EmailTemplateModel = mongoose_1.model('emailTemplate', EmailTemplateSchema);
