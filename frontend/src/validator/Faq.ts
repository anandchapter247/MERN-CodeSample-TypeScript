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
      required: true
    },
  };

  const messages = {
    question: {
        required: true
      },
      answer: {
        required: true
      },
      order: {
        required: true
      },
  };
  const { isValid, errors } = Validator(data, validations, messages);

  return {
    isValid,
    errors
  };
};
