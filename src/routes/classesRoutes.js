import { Router } from "express";
import classController from "../controllers/ClassController";

const router = new Router();

// Rotas de Turmas
router.post("/", classController.createClass);
router.get("/", classController.getAllClasses);
router.get("/:id", classController.getClassById);
router.put("/:id", classController.updateClass);
router.delete("/:id", classController.deleteClass);

export default router;
