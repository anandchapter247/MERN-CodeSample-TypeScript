import { Request, Response } from 'express';
import { GlobalSettingModel } from '../models';
import { ValidationFormatter } from '../common';
import { Document } from 'mongoose';
const { validationResult } = require('express-validator/check');
const addSettingsData = async (req: Request, res: Response): Promise<any> => {
  console.log('inside add settings', req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: ValidationFormatter(errors.mapped()),
      success: false,
    });
  }
  try {
    const { body } = req;
    const {
      facebookURL,
      twitterURL,
      instaURL,
      youtubeURL,
      pinterestURL,
      linkedinURL,
      shopifyURL,
      email,
      supportEmail,
      address,
      website,
      phone,
    } = body;

    const data: object = {
      facebookURL,
      twitterURL,
      instaURL,
      youtubeURL,
      pinterestURL,
      linkedinURL,
      shopifyURL,
      email,
      supportEmail,
      address,
      website,
      phone,
    };

    const settingData: Document = new GlobalSettingModel(data);
    console.log('settingData', settingData);
    const result: any = await settingData.save();

    return res.status(200).json({
      responseCode: 200,
      data: result,
      message: 'Settings Added Successfully.',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message ? error.message : 'Unexpected error occured.',
      success: false,
    });
  }
};
export { addSettingsData };
