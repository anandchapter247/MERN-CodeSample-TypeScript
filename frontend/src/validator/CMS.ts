import Validator from "js-object-validation";
import { message } from "../app/common/messages";

export const HomePageValidator = (data: any) => {
  const validations = {
    mainSectionTitle: {
      required: true
    },
    mainSectionContent: {
      required: true
    },
    mainSectionButtonText: {
      required: true
    },
    mainSectionImageUrl: {
      required: true
    },
    ourStoryContent: {
      required: true
    },
    ourStoryTitle: {
      required: true
    },
    ourStoryVideoLink: {
      required: true
    }
  };

  const messages = {
    mainSectionTitle: {
      required: message.Title
    },
    mainSectionContent: {
      required: message.content
    },
    mainSectionButtonText: {
      required: message.buttonText
    },
    mainSectionImageUrl: {
      required: message.image
    },
    ourStoryContent: {
      required: message.content
    },
    ourStoryTitle: {
      required: message.Title
    },
    ourStoryVideoLink: {
      required: message.VideoURL
    }
  };
  const { isValid, errors } = Validator(data, validations, messages);

  return {
    isValid,
    errors
  };
};
