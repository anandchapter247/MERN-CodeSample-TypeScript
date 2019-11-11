import express from "express";
import UserRouter from "./user";
import AuthRouter from "./auth";
import EmailTemplateRouter from "./emailTemplate";

const router: express.Router = express.Router();

router.use("/user", UserRouter);
router.use("/auth", AuthRouter);
router.use("/email-templates", EmailTemplateRouter);

export default router;
