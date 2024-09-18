import {Router} from "express";
import schoolYearGradeController from "../controllers/SchoolYearGradeController";


const router = new Router;


router.post('/', schoolYearGradeController.store);
router.get('/', schoolYearGradeController.index);
router.put('/:id', schoolYearGradeController.update);
router.put('/:id', schoolYearGradeController.delete);


export default router;