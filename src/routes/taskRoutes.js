import { Router } from "express";
import taskController from "../controllers/TaskController";

const router = new Router();

router.post("/", taskController.store);
export default router;
