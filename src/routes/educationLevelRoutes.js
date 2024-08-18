import {Router} from "express";
import educationLevelController from "../controllers/EducationLevelController";


const router = new Router;


router.post('/', educationLevelController.store);


export default router;