import { Request, Response } from "express";
const { validationResult } = require('express-validator/check');
import { ValidationFormatter } from "../common";
import { EmailTemplateModel } from "../models";
import { Document } from "mongoose";

// Add Template
const addTemplate = async (req: Request, res: Response): Promise<any> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: ValidationFormatter(errors.mapped()),
        success: false,
      });
    }
    try {
      const { body, currentUser } = req;
      const { templateName, subject, htmlContent, designContent } = body;
      const id: string = currentUser ? currentUser.id : '';
      const data: object = {
        templateName, subject, htmlContent, designContent
      };
      const templateData: Document = new EmailTemplateModel(data);
      const result: Document | any = await templateData.save();
  
      return res.status(200).json({
        responseCode: 200,
        message: 'Email Template added successfully',
        data: result,
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.message ? error.message : 'Unexpected error occure.',
        success: false,
      });
    }
};

/**
 * Update Organization
 */

const updateTemplate = async (
    req: Request,
    res: Response,
): Promise<any> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: ValidationFormatter(errors.mapped()),
        success: false,
      });
    }
    try {
      const { body } = req;
      const result: Document = await EmailTemplateModel.update(
        {
          _id: body._id,
        },
        {
          $set: { ...body, updatedAt: Date.now() },
        },
      );
      return res.status(200).json({
        responseCode: 200,
        data: result,
        message: 'Email Template updated successfully',
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.message ? error.message : 'Unexpected error occure.',
        success: false,
      });
    }
};

export {
    addTemplate,
    updateTemplate
}