import express from "express";
import { login } from "./../controllers";
import { LoginValidation } from "../validations";
const AuthRouter: express.Router = express.Router();

AuthRouter.get("/login", LoginValidation, login);

export default AuthRouter;
