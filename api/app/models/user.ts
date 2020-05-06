import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
  },
  userRole: {
    type: String,
    enum: ['Organization', 'Student'],
  },
  loggedInIp: {
    type: String,
  },
  loginToken: {
    type: String,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
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

export const UserModel = model('user', UserSchema);

