import express from 'express';
import {
  login,
  adminDetails,
  adminProfile,
  adminChangePassword,
  forgotPassword,
  linkVerified,
  resetPassword,
  adminProxyLogin,
  studentLogin,
  userLogin,
  userChangePassword,
} from './../controllers';
import {
  LoginValidation,
  ProfileValidation,
  ChangePasswordValidation,
  ForgotPassValidation,
  ResetPasswordValidation,
} from '../validations';
import { ValidateAdminToken, ValidateUserToken } from '../common';
const AuthRouter: express.Router = express.Router();

AuthRouter.post('/login', LoginValidation, login);
AuthRouter.get('/details', ValidateAdminToken, adminDetails);
AuthRouter.put('/update', ValidateAdminToken, ProfileValidation, adminProfile);
AuthRouter.put(
  '/change-password',
  ValidateAdminToken,
  ChangePasswordValidation,
  adminChangePassword,
);
AuthRouter.post('/admin-proxy-login', ValidateAdminToken, adminProxyLogin);
AuthRouter.post('/user-login', LoginValidation, userLogin);
AuthRouter.post('/forgot-password', ForgotPassValidation, forgotPassword);
AuthRouter.get('/link-verified', linkVerified);
AuthRouter.put('/reset-password', ResetPasswordValidation, resetPassword);
AuthRouter.post('/student-login', LoginValidation, studentLogin);
AuthRouter.put(
  '/student-change-password',
  ValidateUserToken,
  ChangePasswordValidation,
  userChangePassword,
);

export default AuthRouter;
