import Validator, { ValidationTypes } from 'js-object-validation';
import { message } from '../../common/messages';

export const passwordValidator = (data: any) => {
  const validations = {
    oldPassword: {
      [ValidationTypes.REQUIRED]: true,
    },
    newPassword: {
      [ValidationTypes.REQUIRED]: true,
      [ValidationTypes.MINLENGTH]: 6,
    },
    confirmPassword: {
      [ValidationTypes.REQUIRED]: true,
      [ValidationTypes.EQUAL]: 'newPassword',
    },
  };
  // Error messages
  const messages = {
    oldPassword: {
      [ValidationTypes.REQUIRED]: message.RequiredOldPassword,
    },
    newPassword: {
      [ValidationTypes.REQUIRED]: message.RequiredPassword,
      [ValidationTypes.MINLENGTH]: message.MinLengthPassword,
    },
    confirmPassword: {
      [ValidationTypes.REQUIRED]: message.RequiredRePassword,
      [ValidationTypes.EQUAL]: message.PasswordMatchError,
    },
  };

  const { isValid, errors } = Validator(data, validations, messages);
  return {
    isValid,
    errors,
  };
};
