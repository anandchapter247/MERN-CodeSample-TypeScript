import { Schema, model } from "mongoose";

const UserSchema: Schema = new Schema({});

export const UserModel = model("user", UserSchema);
