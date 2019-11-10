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
  userLogin,
  userChangePassword,
  signup,
} from './../controllers';
import {
  LoginValidation,
  ProfileValidation,
  ChangePasswordValidation,
  ForgotPassValidation,
  ResetPasswordValidation,
  SignupValidation,
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
AuthRouter.post('/signup', SignupValidation, signup);
AuthRouter.post('/user-login', LoginValidation, userLogin);
AuthRouter.post('/forgot-password', ForgotPassValidation, forgotPassword);
AuthRouter.get('/link-verified', linkVerified);
AuthRouter.put('/reset-password', ResetPasswordValidation, resetPassword);
AuthRouter.put(
  '/student-change-password',
  ValidateUserToken,
  ChangePasswordValidation,
  userChangePassword,
);

export default AuthRouter;
