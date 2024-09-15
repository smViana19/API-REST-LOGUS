import express from 'express';
import SubmitActivityController from '../controllers/SubmitActivityController';
import multer from 'multer';
import multerConfig from '../config/multerConfig';

const router = express.Router();
const upload = multer(multerConfig);

// Rota para submissão de múltiplos arquivos
router.post('/', upload.array('files', 5), SubmitActivityController.store);

export default router;