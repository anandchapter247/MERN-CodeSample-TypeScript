import Validator, { ValidationTypes } from 'js-object-validation';
import { message } from '../../common/messages';

export const profileValidator = (data: any) => {
  const validations = {
    email: {
      [ValidationTypes.REQUIRED]: true,
      [ValidationTypes.EMAIL]: true,
    },
    firstName: {
      [ValidationTypes.REQUIRED]: true,
    },
    lastName: {
      [ValidationTypes.REQUIRED]: true,
    },
  };
  // Error messages
  const messages = {
    email: {
      [ValidationTypes.EMAIL]: message.InvalidEmail,
      [ValidationTypes.REQUIRED]: message.RequiredEmail,
    },
    firstName: {
      [ValidationTypes.REQUIRED]: message.RequiredFirstName,
    },
    lastName: {
      [ValidationTypes.REQUIRED]: message.RequiredLastName,
    },
  };

  const { isValid, errors } = Validator(data, validations, messages);
  return {
    isValid,
    errors,
  };
};
