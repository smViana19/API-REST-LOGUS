import {Router} from "express";
import gradeController from "../controllers/GradeController";
import loginRequired from "../middlewares/loginRequired";
import roleMiddleware from "../middlewares/roleMiddleware";


const router = new Router;

router.post('/', loginRequired, roleMiddleware(["diretor"]), gradeController.store)
router.get('/', loginRequired, gradeController.index)
router.get('/:id', loginRequired, roleMiddleware(["professor", "diretor"]), gradeController.show)
router.put('/:id', loginRequired, roleMiddleware(["diretor"]), gradeController.update)
router.delete('/:id', loginRequired, roleMiddleware(["diretor"]), gradeController.delete)


export default router;