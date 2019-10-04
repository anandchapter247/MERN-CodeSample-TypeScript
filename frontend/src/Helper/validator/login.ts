import Validator, { ValidationTypes } from 'js-object-validation';
import { message } from '../messages';

export const loginValidator = (data: any) => {
  const validations = {
    email: {
      [ValidationTypes.REQUIRED]: true,
      [ValidationTypes.EMAIL]: true,
    },
    password: {
      [ValidationTypes.REQUIRED]: true,
    },
  };
  // Error messages
  const messages = {
    email: {
      [ValidationTypes.EMAIL]: message.InvalidEmail,
      [ValidationTypes.REQUIRED]: message.RequiredEmail,
    },
    password: {
      [ValidationTypes.REQUIRED]: message.RequiredPassword,
    },
  };

  const { isValid, errors } = Validator(data, validations, messages);
  return {
    isValid,
    errors,
  };
};
