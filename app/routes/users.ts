import express from "express";
import { getUsers } from "./../controllers";
const UserRouter: express.Router = express.Router();

UserRouter.get("/", getUsers);

export default UserRouter;
