import {Router} from "express";
import gradeController from "../controllers/GradeController";


const router = new Router;

router.post('/', gradeController.store)
router.get('/', gradeController.index)
router.get('/:id', gradeController.show)
router.put('/:id', gradeController.update)
router.delete('/:id', gradeController.delete)


export default router;