import express from 'express';
import { login } from "./../controllers";
const AuthRouter: express.Router = express.Router();

AuthRouter.get('/login', login);

export default AuthRouter;