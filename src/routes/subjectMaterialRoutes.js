import { Router } from "express";


import loginRequired from '../middlewares/loginRequired'
import roleMiddleware from "../middlewares/roleMiddleware";
import subjectMaterialController from "../controllers/SubjectMaterialController";

const router = new Router;

router.get('/', loginRequired, subjectMaterialController.getLastSubjectMaterials);
router.get('/:subject_id', loginRequired, subjectMaterialController.index);
router.post('/', loginRequired, roleMiddleware(["professor", "diretor"]), subjectMaterialController.store);
router.put('/:id', loginRequired, roleMiddleware(["estudante", "professor", "diretor"]), subjectMaterialController.update);
router.delete('/:id', loginRequired, roleMiddleware(["professor", "diretor"]), subjectMaterialController.delete);


export default router;