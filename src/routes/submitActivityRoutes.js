import express from 'express';
import SubmitActivityController from '../controllers/SubmitActivityController';
import multer from 'multer';
import multerConfig from '../config/multerConfig';

const router = express.Router();
const upload = multer(multerConfig);

router.post('/', upload.array('files', 5), SubmitActivityController.store);
router.get('/:subject_material_id', SubmitActivityController.index )
router.get('/:id', SubmitActivityController.show )


export default router;