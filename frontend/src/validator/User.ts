import Validator, { ValidationTypes } from 'js-object-validation';
import { message } from '../app/common';

export const userValidator = (data: any) => {
  const validations = {
    firstName: {
      [ValidationTypes.REQUIRED]: true,
    },
    lastName: {
      [ValidationTypes.REQUIRED]: true,
    },
    email: {
      [ValidationTypes.REQUIRED]: true,
      [ValidationTypes.EMAIL]: true,
    },
  };
  // Error messages
  const messages = {
    firstName: {
      [ValidationTypes.REQUIRED]: message.RequiredFirstName,
    },
    lastName: {
      [ValidationTypes.REQUIRED]: message.RequiredLastName,
    },
    email: {
      [ValidationTypes.REQUIRED]: message.RequiredEmail,
      [ValidationTypes.EMAIL]: message.InvalidEmail,
    },
  };

  const { isValid, errors } = Validator(data, validations, messages);
  return {
    isValid,
    errors,
  };
};
