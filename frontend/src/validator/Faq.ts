import Validator from "js-object-validation";
import { message } from "../app/common/messages";

export const FaqValidator = (data: any) => {
  const validations = {
    question: {
      required: true
    },
    answer: {
      required: true
    },
    order: {
      required: true,
      numeric:true
    },
  };

  const messages = {
    question: {
        required: message.RequiredQuestion
      },
      answer: {
        required: message.RequiredAnswer
      },
      order: {
        required: message.RequiredOrder,
        numeric:message.InvalidOrder
      },
  };
  const { isValid, errors } = Validator(data, validations, messages);

  return {
    isValid,
    errors
  };
};
