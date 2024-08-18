import {Router} from "express";
import schoolYearGradeController from "../controllers/SchoolYearGradeController";


const router = new Router;


router.post('/', schoolYearGradeController.store);
// router.post('/', schoolYearGradeController.index);


export default router;