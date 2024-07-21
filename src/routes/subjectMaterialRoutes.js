import { Router } from "express";


import loginRequired from '../middlewares/loginRequired'
import roleMiddleware from "../middlewares/roleMiddleware";
import subjectMaterialController from "../controllers/SubjectMaterialController";

const router = new Router;

router.get('/', subjectMaterialController.index);
router.post('/', loginRequired, roleMiddleware(["professor", "diretor"]), subjectMaterialController.store);
router.put('/:id', loginRequired, roleMiddleware(["estudante","professor", "diretor"]), subjectMaterialController.update);
router.delete('/:id', loginRequired, roleMiddleware(["professor","diretor"]), subjectMaterialController.delete);


// TODO: Implementar a rota show para obter um material específico
export default router;