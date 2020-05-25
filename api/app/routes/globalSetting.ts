import express from 'express';
import { addSettingsData } from '../controllers';
const SettingRouter: express.Router = express.Router();

SettingRouter.post('/add', addSettingsData);

export default SettingRouter;
