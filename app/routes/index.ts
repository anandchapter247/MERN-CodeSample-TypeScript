import express from "express";
import UserRouter from "./users";
import AuthRouter from "./auth";

const router: express.Router = express.Router();

router.use("/user", UserRouter);
router.use("/auth", AuthRouter);

export default router;
