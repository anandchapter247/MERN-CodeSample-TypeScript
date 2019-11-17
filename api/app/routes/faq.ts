import express from "express";
import { getFaqs, addFaq, updateFaq, updateFaqStatus } from "../controllers";
const FaqRouter: express.Router = express.Router();

FaqRouter.get("/get", getFaqs);
FaqRouter.post("/add", addFaq);
FaqRouter.put("/update", updateFaq);
FaqRouter.put("/update-status", updateFaqStatus);

export default FaqRouter;
