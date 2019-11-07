import Validator from "js-object-validation";
import { message } from "../app/common/messages";

export const profileValidator = (data: any) => {
  const validations = {
    email: {
      required: true,
      email: true
    },
    firstName: {
      required: true
    },
    lastName: {
      required: true
    }
  };
  // Error messages
  const messages = {
    email: {
      email: message.InvalidEmail,
      required: message.RequiredEmail
    },
    firstName: {
      required: message.RequiredFirstName
    },
    lastName: {
      required: message.RequiredLastName
    }
  };

  const { isValid, errors } = Validator(data, validations, messages);
  return {
    isValid,
    errors
  };
};
