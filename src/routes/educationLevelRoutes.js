import {Router} from "express";
import educationLevelController from "../controllers/EducationLevelController";


const router = new Router;


router.post('/', educationLevelController.store);
router.get('/', educationLevelController.index);
router.get('/:id', educationLevelController.show);
router.put('/:id', educationLevelController.update);
router.delete('/:id', educationLevelController.delete);


export default router;