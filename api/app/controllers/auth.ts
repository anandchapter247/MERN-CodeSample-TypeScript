import { Request, Response } from "express";
import { UserModel, AdminModel, EmailTemplateModel } from "../models";
import {
  encryptPassword,
  comparePassword,
  generateSalt,
  JWTSecrete,
  ValidationFormatter,
  Email,
  encrypt,
  decrypt,
  getIpAddress
} from "../common";
import { sign as JWTSign } from "jsonwebtoken";
import { Document } from "mongoose";
import { webURL } from "../config";
import { message } from "../common/messages";
const { validationResult } = require("express-validator/check");

/**
 * @api {post} /login  Admin Login
 * @apiName Admin Login
 * @apiGroup Authentication
 * @apiPermission none
 * @apiDescription In this case "apiErrorStructure" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 * @apiParam {String} email Email of the Admin.
 * @apiParam {String} password Password of the Admin.
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *   "_id": 1,
 *   "email": "Study",
 *   "createdAt": "2016-02-10T15:46:51.778Z"
 * }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
const login = async (req: Request, res: Response): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: ValidationFormatter(errors.mapped()),
      success: false
    });
  }
  try {
    const { body } = req;
    const { email, password } = body;
    const result: Document | null | any = await AdminModel.findOne({
      email: email
    });
    if (result == null) {
      throw {
        code: 404,
        message: message.emailNotFound,
        success: false
      };
    }
    if (!comparePassword(password, result.password)) {
      throw {
        code: 400,
        message: "Password did not match",
        success: false
      };
    }
    const token = JWTSign(
      {
        id: result.id,
        randomKey: generateSalt(8),
        email: email,
        firstName: result.firstName,
        lastName: result.lastName
      },
      JWTSecrete,
      {
        expiresIn: 86400
      }
    );
    return res.status(200).json({
      responseCode: 200,
      message: "Logged in Successfully",
      data: result,
      token: token
    });
  } catch (error) {
    console.log(error);
    const code = error.code ? error.code : 500;
    res.status(code).json({
      code: code,
      message: error.message ? error.message : "Unexpected error occure.",
      success: false
    });
  }
};

/**
 * View Admin Details
 */
const adminDetails = async (req: Request, res: Response): Promise<any> => {
  try {
    const { currentUser } = req;
    if (currentUser) {
      const result = await AdminModel.findById(currentUser.id);
      console.log(result, "+++++++++++");

      return res.status(200).json({
        responseCode: 200,
        data: result,
        success: true
      });
    } else {
      return res.status(404).json({
        responseCode: 404,
        message: "User not found.",
        success: true
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message ? error.message : "Unexpected error occure.",
      success: false
    });
  }
};

/**
 * Update Admin Profile
 */
const adminProfile = async (req: Request, res: Response): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: ValidationFormatter(errors.mapped()),
      success: false
    });
  }
  try {
    const { currentUser, body } = req;
    if (currentUser) {
      const users = await AdminModel.find({
        email: body.email,
        _id: {
          $ne: currentUser.id
        }
      });
      if (users.length > 0) {
        return res.status(401).json({
          message: message.emailExist,
          success: false
        });
      }
      const result = await UserModel.update(
        {
          _id: currentUser.id
        },
        {
          $set: {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email
          }
        }
      );
      return res.status(200).json({
        responseCode: 200,
        message: "Admin profile updated successfully",
        data: result,
        success: true
      });
    } else {
      return res.status(404).json({
        responseCode: 404,
        message: "User not found",
        success: false
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message ? error.message : "Unexpected error occure.",
      success: false
    });
  }
};

/**
 * Admin ChangePassword
 */
const adminChangePassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: ValidationFormatter(errors.mapped()),
      success: false
    });
  }
  try {
    const { body, currentUser } = req;
    const users: Document | null | any = await AdminModel.findOne({
      _id: currentUser ? currentUser.id : undefined
    });
    if (!comparePassword(body.oldPassword, users.password)) {
      throw {
        code: 400,
        message: "Old Password did not match.",
        success: false
      };
    }
    const salt = generateSalt();
    body.newPassword = encryptPassword(body.newPassword, salt);
    if (currentUser) {
      const result = await AdminModel.update(
        {
          _id: currentUser.id
        },
        {
          $set: {
            password: body.newPassword,
            salt: salt
          }
        }
      );
      return res.status(200).json({
        responseCode: 200,
        message: "Password updated successfully.",
        data: result,
        success: true
      });
    } else {
      return res.status(404).json({
        responseCode: 404,
        message: "User not found",
        success: false
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message ? error.message : "Unexpected error occure.",
      success: false
    });
  }
};

const signup = async (req: Request, res: Response): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: ValidationFormatter(errors.mapped()),
      success: false,
    });
  }
  try {
    const { body } = req;
    const { firstName, lastName, email, password } = body;
    const user: Document | null | any = await UserModel.findOne({
      email,
      isDeleted: false,
    });
    if (user) {
      return res.status(400).json({
        code: 400,
        message: message.emailExist,
        success: false,
      });
    }

    const salt: string = generateSalt(10);
    const encryptedPassword:string = encryptPassword(password, salt);
    const data: object = {
      firstName,
      lastName,
      email,
      password: encryptedPassword,
    };
    const studentData: Document = new UserModel(data);
    const result: any = await studentData.save();

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
      message: 'Student Added Successfully.',
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
 * Organization Login
 */
const userLogin = async (req: Request, res: Response): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: ValidationFormatter(errors.mapped()),
      success: false
    });
  }
  try {
    const { body } = req;
    const { email, password } = body;
    const result: Document | null | any = await UserModel.findOne({
      email: email,
      isDeleted: false
    });
    if (result == null) {
      throw {
        code: 404,
        message: "Email address not found",
        success: false
      };
    }
    if (!result.isActive) {
      throw {
        code: 400,
        message: "Account has been deactivated by super admin.",
        success: false
      };
    }
    if (!comparePassword(password, result.password)) {
      throw {
        code: 400,
        message: "Password did not match",
        success: false
      };
    }
    result.set({
      loggedInIp: getIpAddress(req),
      loginToken: generateSalt(20)
    });
    const tokenData = await result.save();
    const token = JWTSign(
      {
        id: result.id,
        loginToken: tokenData.loginToken,
        email: email,
        firstName: result.firstName,
        lastName: result.lastName,
        phoneNumber: result.phoneNumber
        // courseId: result.courseId,
      },
      JWTSecrete,
      {
        expiresIn: 86400
      }
    );
    const users: Document = await UserModel.update(
      {
        _id: result.id,
        email: result.email
      },
      {
        $set: {
          lastLogin: new Date(Date.now())
        }
      }
    );
    console.log("curent", req.currentUser);

    return res.status(200).json({
      responseCode: 200,
      message: "Loggedin Successfully",
      data: result,
      token: token
    });
  } catch (error) {
    console.log(error);
    const code = error.code ? error.code : 500;
    res.status(code).json({
      code: code,
      message: error.message ? error.message : "Unexpected error occure.",
      success: false
    });
  }
};

/**
 * Forgot Password
 */
const forgotPassword = async (req: Request, res: Response): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: ValidationFormatter(errors.mapped()),
      success: false
    });
  }
  try {
    const { body } = req;
    const result: any = await UserModel.findOne({
      email: body.email,
      isDeleted: false
    });
    if (result === null) {
      throw {
        code: 400,
        message: message.emailNotFound
      };
    }
    body.email = encrypt(result.email);
    body.id = encrypt(result._id);
    body.verifyToken = encrypt(result.email + result.id);
    const updateToken: Document = await UserModel.update(
      {
        email: result.email,
        _id: result._id
      },
      {
        verifyToken: body.verifyToken
      }
    );
    // const email = new Email(req);
    // await email.setTemplate("FORGOTPASSWORD", {
    //   firstName: result.firstName,
    //   lastName: result.lastName,
    //   email: body.email,
    //   _id: body.id,
    //   verifyToken: body.verifyToken,
    //   WebURL: webURL
    // });
    // console.log("email", email);

    // await email.sendEmail(result.email);
    return res.status(200).json({
      message: message.emaiSent,
      data: updateToken,
      success: true
    });

    // Fetch email template from db
    // const emailData: any = await EmailTemplateModel.findOne({
    //   templateName: 'Registration',
    // });
    // console.log(emailData, ':::::::::::::::');

    // const email = new Email(req);
    // await email.setTemplate(emailData.htmlContent, {
    //   first_name: 'Aayushi',
    //   email_address: 'ayushij.chapter247@gmail.com',
    //   password: '12345678',
    // });
    // console.log('email', email);
    // await email.sendEmail('ayushij.chapter247@gmail.com');
  } catch (error) {
    const code = error.code ? error.code : 500;
    res.status(code).json({
      code: code,
      message: error.message ? error.message : "Unexpected error occure.",
      success: false
    });
  }
};

/**
 * Link Verification
 */
const linkVerified = async (req: Request, res: Response): Promise<any> => {
  try {
    const { query } = req;
    query.email = decrypt(query.user);
    query.id = decrypt(query.verification);
    const result: any = await UserModel.findOne({
      email: query.email,
      _id: query.id,
      verifyToken: query.token,
      isDeleted: false
    });
    if (result === null) {
      throw {
        code: 400,
        message: "Your verification link has been expired.",
        success: false
      };
    }
    return res.status(200).json({
      message: "Link verified successfully!",
      data: result,
      success: true
    });
  } catch (error) {
    const code = error.code ? error.code : 500;
    res.status(code).json({
      code: code,
      message: error.message ? error.message : "Unexpected error occure.",
      success: false
    });
  }
};

/**
 * Reset PassWord
 */
const resetPassword = async (req: Request, res: Response): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: ValidationFormatter(errors.mapped()),
      success: false
    });
  }
  try {
    const { body } = req;
    const email: string = body.email;
    const id: string = body._id;
    const verifyToken: string = body.verifyToken;
    var salt = generateSalt(6);
    body.salt = salt;
    body.password = encryptPassword(body.password, salt);
    const result: Document = await UserModel.update(
      {
        _id: id,
        email: email,
        verifyToken: verifyToken
      },
      {
        $set: {
          password: body.password,
          // salt: body.salt,
          verifyToken: ""
        }
      },
      {
        new: true
      }
    );
    return res.status(200).json({
      responseCode: 200,
      data: result,
      message: message.passwordChanged,
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message ? error.message : "Unexpected error occure.",
      success: false
    });
  }
};

/**
 * Admin Proxy Login
 */

const adminProxyLogin = async (req: Request, res: Response): Promise<any> => {
  const { body } = req;
  const { id } = body;
  console.log(id);

  try {
    const result: Document | null | any = await UserModel.findOne({
      _id: id,
      isDeleted: false
    });
    console.log(result);

    if (!result) {
      return res.status(404).json({
        responseCode: 404,
        message: "Data not found.",
        success: true
      });
    }
    result.set({
      loggedInIp: getIpAddress(req),
      loginToken: generateSalt(20)
    });
    const tokenData = await result.save();
    const token = JWTSign(
      {
        id: result.id,
        loginToken: tokenData.loginToken,
        email: result.email,
        firstName: result.firstName,
        lastName: result.lastName,
        phoneNumber: result.phoneNumber,
        courseId: result.courseId
      },
      JWTSecrete,
      {
        expiresIn: 86400
      }
    );
    return res.status(200).json({
      responseCode: 200,
      token: token,
      data: result,
      message: "Login Successful.",
      success: true
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      responsecode: 500,
      message: error.message ? error.message : "Unexpected error occure.",
      success: false
    });
  }
};

/**
 * User ChangePassword
 */
const userChangePassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: ValidationFormatter(errors.mapped()),
      success: false
    });
  }
  try {
    const { body, currentUser } = req;
    const users: Document | null | any = await UserModel.findOne({
      _id: currentUser ? currentUser.id : undefined
    });
    if (!comparePassword(body.oldPassword, users.password)) {
      throw {
        code: 400,
        message: "Old Password did not match.",
        success: false
      };
    }
    const salt = generateSalt();
    body.newPassword = encryptPassword(body.newPassword, salt);
    if (currentUser) {
      const result = await UserModel.update(
        {
          _id: currentUser.id
        },
        {
          $set: {
            password: body.newPassword,
            salt: salt
          }
        }
      );
      return res.status(200).json({
        responseCode: 200,
        message: "Password updated successfully.",
        data: result,
        success: true
      });
    } else {
      return res.status(404).json({
        responseCode: 404,
        message: "User not found",
        success: false
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message ? error.message : "Unexpected error occure.",
      success: false
    });
  }
};

export {
  login,
  adminDetails,
  adminProfile,
  adminChangePassword,
  signup,
  userLogin,
  forgotPassword,
  linkVerified,
  resetPassword,
  adminProxyLogin,
  userChangePassword
};
