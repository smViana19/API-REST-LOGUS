import express from 'express';
import SubmitActivityController from '../controllers/SubmitActivityController';

const router = express.Router();

router.post('/', SubmitActivityController.store);

export default router;