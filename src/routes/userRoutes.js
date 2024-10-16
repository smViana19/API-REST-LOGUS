import {Router} from "express";
import userController from "../controllers/UserController";
import loginRequired from "../middlewares/loginRequired";
import roleMiddleware from "../middlewares/roleMiddleware";

const router = new Router();

router.post("/", userController.store);

router.get(
  "/",
  loginRequired,
  roleMiddleware(["diretor"]),
  userController.index,
);
router.get("/count", loginRequired, roleMiddleware(["diretor"]), userController.countStudents);
router.get("/count/professores", loginRequired, roleMiddleware(["diretor"]), userController.countTeachers);

router.get("/:id", loginRequired, roleMiddleware(["diretor"]), userController.show,);
router.put("/:id", loginRequired, userController.update);
router.delete("/:id", loginRequired, roleMiddleware(["diretor"]), userController.delete,);

export default router;

/*
index -> lista todos os usuarios -> GET
store/create -> cria um novo usuario -> POST
delete -> apaga um usuario -> DELETE
show -> mostra um usuario -> GET
update -> atualiza um usuario -> PATCH ou PUT

*/
