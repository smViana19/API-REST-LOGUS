import { Router } from "express";
import noteController from "../controllers/NoteController";

const router = new Router();
router.post('/', noteController.createOrUpdateNote);
router.get('/', noteController.getAllNotes);
router.get('/:id', noteController.getNoteById);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

router.get('/estudante/:studentId', noteController.getAllSubjectsAndGrades);
export default router;