import {Router} from "express";
import taskController from "../controllers/TaskController";
import loginRequired from "../middlewares/loginRequired";
import roleMiddleware from "../middlewares/roleMiddleware";

const router = new Router();

router.post("/", loginRequired, roleMiddleware("estudante"), taskController.store);
router.put("/:id", loginRequired, roleMiddleware("estudante"), taskController.update);
router.delete("/:id", loginRequired, roleMiddleware("estudante"), taskController.delete);
export default router;
