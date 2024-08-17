import {Router} from "express";
import taskController from "../controllers/TaskController";
import loginRequired from "../middlewares/loginRequired";
import roleMiddleware from "../middlewares/roleMiddleware";

const router = new Router();

router.post("/", loginRequired, roleMiddleware(["professor", "diretor"]), taskController.store);
router.put("/:id", loginRequired, roleMiddleware(["professor", "diretor"]), taskController.update);
router.delete("/:id", loginRequired, roleMiddleware(["professor", "diretor"]), taskController.delete);
export default router;
