import Validator from 'js-object-validation';
import { message } from '../app/common';

export const globalSettingValidator = (data: any) => {
  const validations = {
    facebookURL: { url: true },
    twitterURL: { url: true },
    instaURL: { url: true },
    youtubeURL: { url: true },
    pinterestURL: { url: true },
    linkedinURL: { url: true },
    shopifyURL: { url: true },
    website: { url: true },
    email: {
      email: true,
    },
    supportEmail: {
      email: true,
    },
    address: {
      maxlength: 100,
    },
    phone: {
      numeric: true,
      minlength: 7,
      maxlength: 14,
    },
    noOfDays: {
      numeric: true,
    },
    adminEmail: {
      email: true,
    },
  };
  // Error messages
  const messages = {
    facebookURL: { url: message.URLValid },
    twitterURL: { url: message.URLValid },
    instaURL: { url: message.URLValid },
    youtubeURL: { url: message.URLValid },
    pinterestURL: { url: message.URLValid },
    linkedinURL: { url: message.URLValid },
    shopifyURL: { url: message.URLValid },
    website: { url: message.URLValid },
    email: { email: message.ValidEMail },
    adminEmail: { email: message.ValidEMail },
    supportEmail: { email: message.ValidEMail },
    address: { maxlength: message.MaxLengthAddress },
    phone: {
      numeric: message.Numeric,
      minlength: message.MinLengthNumber,
      maxlength: message.MaxLengthNumber,
    },
    noOfDays: { numeric: message.Numeric },
  };

  const { isValid, errors } = Validator(data, validations, messages);
  return {
    isValid,
    errors,
  };
};
