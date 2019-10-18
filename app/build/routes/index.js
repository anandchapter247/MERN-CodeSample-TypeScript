"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./users"));
const auth_1 = __importDefault(require("./auth"));
const emailTemplate_1 = __importDefault(require("./emailTemplate"));
const router = express_1.default.Router();
router.use("/user", users_1.default);
router.use("/auth", auth_1.default);
router.use("/email-templates", emailTemplate_1.default);
exports.default = router;
