"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("./../controllers");
const UserRouter = express_1.default.Router();
UserRouter.get("/", controllers_1.getUsers);
exports.default = UserRouter;
