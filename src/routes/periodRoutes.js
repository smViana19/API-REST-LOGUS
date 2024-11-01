import { Router } from "express";
import periodController from "../controllers/PeriodController";

const router = new Router();
router.post('/', periodController.createPeriod);
router.get('/', periodController.getAllPeriods);
router.get('/:id', periodController.getPeriodById);
router.put('/:id', periodController.updatePeriod);
router.delete('/:id', periodController.deletePeriod);

export default router;