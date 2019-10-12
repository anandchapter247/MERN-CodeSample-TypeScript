import { Schema, model } from 'mongoose';

const EmailTemplateSchema: Schema = new Schema({
  templateName: {
    type: String,
  },
  subject: {
    type: String,
  },
  htmlContent: {
    type: String,
  },
  designContent: {
    type: Object,
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

export const EmailTemplateModel = model('emailTemplate', EmailTemplateSchema);
