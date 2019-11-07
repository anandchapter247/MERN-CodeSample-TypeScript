import Validator from "js-object-validation";
import { message } from "../app/common/messages";

export const passwordValidator = (data: any) => {
  const validations = {
    oldPassword: {
      required: true
    },
    newPassword: {
      required: true,
      minlength: 6
    },
    confirmPassword: {
      required: true,
      equal: "newPassword"
    }
  };
  // Error messages
  const messages = {
    oldPassword: {
      required: message.RequiredOldPassword
    },
    newPassword: {
      required: message.RequiredPassword,
      minlength: message.MinLengthPassword
    },
    confirmPassword: {
      required: message.RequiredRePassword,
      equal: message.PasswordMatchError
    }
  };

  const { isValid, errors } = Validator(data, validations, messages);
  return {
    isValid,
    errors
  };
};
