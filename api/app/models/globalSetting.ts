import { Schema, model } from 'mongoose';

const GlobalSetting: Schema = new Schema({
  facebookURL: {
    type: String,
  },
  twitterURL: {
    type: String,
  },
  instaURL: {
    type: String,
  },
  youtubeURL: {
    type: String,
  },
  pinterestURL: {
    type: String,
  },
  linkedinURL: {
    type: String,
  },
  shopifyURL: {
    type: String,
  },
  email: {
    type: String,
  },
  supportEmail: {
    type: String,
  },
  address: {
    type: String,
  },
  website: {
    type: String,
  },
  phone: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const GlobalSettingModel = model('setting', GlobalSetting);
