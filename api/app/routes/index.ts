import express from 'express';
import UserRouter from './user';
import AuthRouter from './auth';
import EmailTemplateRouter from './emailTemplate';
import FaqRouter from './faq';
import SettingRouter from './globalSetting';
const router: express.Router = express.Router();

router.use('/user', UserRouter);
router.use('/auth', AuthRouter);
router.use('/email-templates', EmailTemplateRouter);
router.use('/faq', FaqRouter);
router.use('/settings', SettingRouter);

export default router;
