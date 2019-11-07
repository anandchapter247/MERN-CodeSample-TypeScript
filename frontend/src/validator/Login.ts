import Validator from "js-object-validation";
import { message } from "../app/common/messages";

export const loginValidator = (data: any) => {
  const validations = {
    email: {
      required: true,
      email: true
    },
    password: {
      required: true
    }
  };
  // Error messages
  const messages = {
    email: {
      email: message.InvalidEmail,
      required: message.RequiredEmail
    },
    password: {
      required: message.RequiredPassword
    }
  };

  const { isValid, errors } = Validator(data, validations, messages);
  return {
    isValid,
    errors
  };
};
