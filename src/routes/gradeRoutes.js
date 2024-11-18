import { Router } from "express";
import gradeController from "../controllers/GradeController";

const router = new Router();
router.post('/', gradeController.addGrade)
router.get("/student/:user_id", gradeController.getGradesByStudent);
router.get('/subject/:subject_id', gradeController.getGradeBySubject);
router.put('/:id', gradeController.updateGrade)
router.delete('/:id', gradeController.deleteGrade)

export default router;