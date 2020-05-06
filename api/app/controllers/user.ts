import { Request, Response } from 'express';
import { UserModel, EmailTemplateModel } from '../models';
import { generatePassword, encryptPassword, generateSalt, message } from '../common';
import { Document, Types } from 'mongoose';
import excel from 'node-excel-export';
import { validationResult } from 'express-validator';
import { ValidationFormatter } from '../common/formatter';
import { Email } from '../common';
import moment from 'moment';

const addUser = async (req: Request, res: Response): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: ValidationFormatter(errors.mapped()),
      success: false,
    });
  }
  try {
    const { body } = req;
    const { firstName, lastName, email } = body;
    const users: Document | null | any = await UserModel.findOne({
      email,
      isDeleted: false,
    });
    if (users) {
      return res.status(400).json({
        code: 400,
        message: message.emailExist,
        success: false,
      });
    }

    const salt: string = generateSalt(10);
    const password: string = generatePassword(10);
    body.password = encryptPassword(password, salt);
    const data: object = {
      firstName,
      lastName,
      email,
      password,
    };
    const userData: Document = new UserModel(data);
    const result: any = await userData.save();

    // email template for registration
    const availabelTemplate:any = await EmailTemplateModel.findOne({
      templateName: {
        $regex: new RegExp('registration'.trim(), 'i'),
      }
    })
    if (availabelTemplate) {
      console.log('in iffff');
      const emailInstance: any = new Email(req);
      await emailInstance.setTemplate(availabelTemplate.subject,availabelTemplate.htmlContent, {
        firstName
      });
      await emailInstance.sendEmail(email);
    }
    
    return res.status(200).json({
      responseCode: 200,
      data: result,
      message: 'User Added Successfully.',
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
|--------------------------------------------------
| Get All Student
|--------------------------------------------------
*/

const getUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const { query } = req;
    const searchValue: string = query.searchValue || '';
    const isActive: string = query.isActive || '';
    const skip: number = parseInt(query.skip) || 0;
    const limit: number = parseInt(query.limit) || 10;
    const sortBy: number = query.sortBy || '';
    const studentId: any = query.studentId || '';
    let condition: object = {};
    let sort: any = { createdAt: -1 };

    if (sortBy == 1) {
      // Sort student name by A-Z
      sort = {
        firstName: 1,
      };
    } else if (sortBy == 2) {
      // Sort student name by Z-A
      sort = {
        firstName: -1,
      };
    } else if (sortBy == 3) {
      sort = {
        createdAt: 1,
      };
    } else if (sortBy == 4) {
      sort = {
        createdAt: -1,
      };
    }
    if (searchValue) {
      condition = {
        $or: [
          {
            firstName: {
              $regex: new RegExp(searchValue.trim(), 'i'),
            },
          },
          {
            lastName: {
              $regex: new RegExp(searchValue.trim(), 'i'),
            },
          },
          {
            email: {
              $regex: new RegExp(searchValue.trim(), 'i'),
            },
          },
        ],
      };
    }
    if (isActive !== '') {
      condition = { ...condition, isActive };
    }

    if (studentId) {
      let stdId = studentId.split(',');
      let blankArray: any = [];
      stdId.forEach((e: any) => {
        blankArray.push(Types.ObjectId(e));
      });
      condition = {
        ...condition,
        _id: { $in: blankArray },
      };
    }

    const totalRecords: number = await UserModel.countDocuments({
      ...condition,
      isDeleted: false,
    });
    const result: Document[] = await UserModel.find({
      ...condition,
      isDeleted: false,
    })
      .sort(sort)
      .skip(skip)
      .limit(limit);
    return res.status(200).json({
      responseCode: 200,
      data: result,
      totalRecords,
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
|--------------------------------------------------
| View User Details
|--------------------------------------------------
*/

const viewUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { query } = req;
    const { id }: string | any = query;
    const result: Document | null | any = await UserModel.findById(id)
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

/**
|--------------------------------------------------
| Update User
|--------------------------------------------------
*/

const updateUser = async (req: Request, res: Response): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: ValidationFormatter(errors.mapped()),
      success: false,
    });
  }
  try {
    const { body } = req;
    const { _id } = body;
    if (body.password) {
      var salt: string = generateSalt(6);
      body.salt = salt;
      body.password = encryptPassword(body.password, salt);
    } else {
      delete body.password;
    }
    const student: Document[] = await UserModel.find({
      email: body.email,
      isDeleted: false,
      _id: { $ne: _id },
    });
    if (student.length > 0) {
      return res.status(400).json({
        message: 'Email address already exist',
        success: false,
      });
    }

    const result: Document = await UserModel.update(
      {
        _id: _id,
      },
      {
        $set: {
          ...body,
        },
      },
    );

    return res.status(200).json({
      responseCode: 200,
      data: result,
      message: 'User details updated successfully.',
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
|--------------------------------------------------
| Update Student Status(Active/Deactive)
|--------------------------------------------------
*/

const updateStatus = async (req: Request, res: Response): Promise<any> => {
  try {
    const { body } = req;
    const { id, isActive } = body;
    const result: Document = await UserModel.update(
      {
        _id: {$in:id},
      },
      {
        $set: {
          isActive: isActive,
        },
      },
    );
    const message: string =
      isActive == true
        ? 'User activated successfully!'
        : 'User deactivated successfully!';
    return res.status(200).json({
      responseCode: 200,
      data: result,
      message: message,
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
  addUser,
  getUsers,
  viewUser,
  updateUser,
  updateStatus
}