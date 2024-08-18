import {Router} from "express";
import SchoolYearController from "../controllers/SchoolYearController";

const router = new Router;

router.post('/', SchoolYearController.store)
router.get('/', SchoolYearController.index)


export default router;