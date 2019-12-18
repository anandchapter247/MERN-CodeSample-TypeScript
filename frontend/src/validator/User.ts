import Validator from 'js-object-validation';
import { message } from '../app/common';

export const userValidator = (data: any) => {
  const validations = {
    firstName: {
      required: true,
    },
    lastName: {
      required: true,
    },
    email: {
      required: true,
      email: true,
    },
  };
  // Error messages
  const messages = {
    firstName: {
      required: message.RequiredFirstName,
    },
    lastName: {
      required: message.RequiredLastName,
    },
    email: {
      required: message.RequiredEmail,
      email: message.InvalidEmail,
    },
  };

  const { isValid, errors } = Validator(data, validations, messages);
  return {
    isValid,
    errors,
  };
};
