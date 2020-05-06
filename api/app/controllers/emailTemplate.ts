import { Request, Response } from 'express';
const { validationResult } = require('express-validator/check');
import { ValidationFormatter } from '../common';
import { EmailTemplateModel } from '../models';
import { Document } from 'mongoose';

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
      templateName,
      subject,
      htmlContent,
      designContent,
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

const updateTemplate = async (req: Request, res: Response): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: ValidationFormatter(errors.mapped()),
      success: false,
    });
  }
  try {
    const { body } = req;
    const { id } = body;
    const result: Document = await EmailTemplateModel.update(
      {
        _id:id,
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

const getTemplates = async (req: Request, res: Response): Promise<any> => {
  try {
    const result: Document[] = await EmailTemplateModel.find();
    return res.status(200).json({
      responseCode: 200,
      data: result,
      message: 'Email Template fetched successfully',
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
 * View Email Template
 */

const viewTemplate = async (req: Request, res: Response): Promise<any> => {
  try {
    const { query } = req;
    const { id } = query;
    const result = await EmailTemplateModel.findById(id);
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message ? error.message : 'Unexpected error occure.',
      success: false,
    });
  }
};

export { addTemplate, updateTemplate, getTemplates, viewTemplate };
