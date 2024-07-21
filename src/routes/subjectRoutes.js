import { Router } from "express";
import subjectController from '../controllers/SubjectController';

import loginRequired from '../middlewares/loginRequired'
import roleMiddleware from "../middlewares/roleMiddleware";

const router = new Router;

router.get('/', subjectController.index);
router.post('/', loginRequired, roleMiddleware(["professor", "diretor"]), subjectController.store);
router.put('/:id', loginRequired, roleMiddleware(["professor", "diretor"]), subjectController.update);
router.delete('/:id', loginRequired, roleMiddleware(["professor","diretor"]), subjectController.delete);

export default router;