import { Router } from "express";
import classStudentsController from "../controllers/ClassStudentsController";
const router = new Router();
router.post('/', classStudentsController.addStudentToClass);
router.get('/:class_id', classStudentsController.getStudentByClass);
router.delete('/', classStudentsController.removeStudentFromClass);

export default router;