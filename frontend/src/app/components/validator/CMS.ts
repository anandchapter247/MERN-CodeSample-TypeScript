import Validator, { ValidationTypes } from 'js-object-validation';
import { message } from '../../common/messages';

export const HomePageValidator = (data: any) => {
  const validations = {
    mainSectionTitle: {
      [ValidationTypes.REQUIRED]: true,
    },
    mainSectionContent: {
      [ValidationTypes.REQUIRED]: true,
    },
    mainSectionButtonText: {
      [ValidationTypes.REQUIRED]: true,
    },
    mainSectionImageUrl: {
      [ValidationTypes.REQUIRED]: true,
    },
    ourStoryContent: {
      [ValidationTypes.REQUIRED]: true,
    },
    ourStoryTitle: {
      [ValidationTypes.REQUIRED]: true,
    },
    ourStoryVideoLink: {
      [ValidationTypes.REQUIRED]: true,
    }
  };

  const messages = {
    mainSectionTitle: {
      [ValidationTypes.REQUIRED]: message.Title,
    },
    mainSectionContent: {
      [ValidationTypes.REQUIRED]: message.content,
    },
    mainSectionButtonText: {
      [ValidationTypes.REQUIRED]: message.buttonText,
    },
    mainSectionImageUrl: {
      [ValidationTypes.REQUIRED]: message.image,
    },
    ourStoryContent: {
      [ValidationTypes.REQUIRED]: message.content
    },
    ourStoryTitle: {
      [ValidationTypes.REQUIRED]: message.Title,
    },
    ourStoryVideoLink: {
      [ValidationTypes.REQUIRED]: message.VideoURL,
    }
  };
  const { isValid, errors } = Validator(data, validations, messages);

  return {
    isValid,
    errors,
  };
};
