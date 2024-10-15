import { Router } from "express";
import noteController from "../controllers/NoteController";

const router = new Router();
router.get('/', noteController.index)
router.post('/', noteController.store);

export default router;