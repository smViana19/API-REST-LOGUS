import {Router} from "express";
import gradeController from "../controllers/GradeController";


const router = new Router;

router.post('/', gradeController.store)
router.get('/', gradeController.index)


export default router;