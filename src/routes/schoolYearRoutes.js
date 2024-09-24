import {Router} from "express";
import SchoolYearController from "../controllers/SchoolYearController";

const router = new Router;

router.post('/', SchoolYearController.store)
router.get('/', SchoolYearController.index)
router.get('/:id', SchoolYearController.show)
router.put('/:id', SchoolYearController.update)
router.delete('/:id', SchoolYearController.delete)


export default router;