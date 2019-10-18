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
const { validationResult } = require('express-validator/check');
const common_1 = require("../common");
const models_1 = require("../models");
// Add Template
const addTemplate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: common_1.ValidationFormatter(errors.mapped()),
            success: false,
        });
    }
    try {
        const { body, currentUser } = req;
        const { templateName, subject, htmlContent, designContent } = body;
        const id = currentUser ? currentUser.id : '';
        const data = {
            templateName,
            subject,
            htmlContent,
            designContent,
        };
        const templateData = new models_1.EmailTemplateModel(data);
        const result = yield templateData.save();
        return res.status(200).json({
            responseCode: 200,
            message: 'Email Template added successfully',
            data: result,
            success: true,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message ? error.message : 'Unexpected error occure.',
            success: false,
        });
    }
});
exports.addTemplate = addTemplate;
/**
 * Update Organization
 */
const updateTemplate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: common_1.ValidationFormatter(errors.mapped()),
            success: false,
        });
    }
    try {
        const { body } = req;
        const result = yield models_1.EmailTemplateModel.update({
            _id: body._id,
        }, {
            $set: Object.assign(Object.assign({}, body), { updatedAt: Date.now() }),
        });
        return res.status(200).json({
            responseCode: 200,
            data: result,
            message: 'Email Template updated successfully',
            success: true,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message ? error.message : 'Unexpected error occure.',
            success: false,
        });
    }
});
exports.updateTemplate = updateTemplate;
const getTemplates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield models_1.EmailTemplateModel.find();
        return res.status(200).json({
            responseCode: 200,
            data: result,
            message: 'Email Template fetched successfully',
            success: true,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message ? error.message : 'Unexpected error occure.',
            success: false,
        });
    }
});
exports.getTemplates = getTemplates;
/**
 * View Email Template
 */
const viewTemplate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req;
        const { id } = query;
        const result = yield models_1.EmailTemplateModel.findById(id);
        console.log(result, 'template');
        if (result == null) {
            return res.status(404).json({
                responseCode: 404,
                message: 'Data not found',
                success: true,
            });
        }
        return res.status(200).json({
            responseCode: 200,
            data: result,
            success: true,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message ? error.message : 'Unexpected error occure.',
            success: false,
        });
    }
});
exports.viewTemplate = viewTemplate;
