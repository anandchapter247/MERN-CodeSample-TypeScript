import express from 'express';
import { importCsvFile, importExcelFile, importPdfFile } from '../controllers';

import { storageFile } from '../common/image';
import multer from 'multer';

const upload: multer.Instance = multer({ storage: storageFile });
const UploadRouter: express.Router = express.Router();

UploadRouter.post('/import-csv', upload.single('file'), importCsvFile);
UploadRouter.post('/import-excel', upload.single('file'), importExcelFile);
// UploadRouter.post('/import-pdf', upload.single('file'), importPdfFile);

export default UploadRouter;
