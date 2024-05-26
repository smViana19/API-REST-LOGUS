import { Router } from "express";
import userController from "../controllers/UserController";
import loginRequired from "../middlewares/loginRequired";
import roleMiddleware from "../middlewares/roleMiddleware";

const router = new Router();

router.post("/", userController.store);

router.get(
  "/",
  loginRequired,
  roleMiddleware(["diretor", "professor", "estudante"]),
  userController.index,
);
router.get(
  "/:id",
  loginRequired,
  roleMiddleware(["diretor"]),
  userController.show,
);
router.put("/:id", loginRequired, userController.update);
router.delete(
  "/:id", // Corrigido para aceitar ID na URL
  loginRequired,
  roleMiddleware(["diretor"]),
  userController.delete,
);

export default router;

/*
index -> lista todos os usuarios -> GET
store/create -> cria um novo usuario -> POST
delete -> apaga um usuario -> DELETE
show -> mostra um usuario -> GET
update -> atualiza um usuario -> PATCH ou PUT

*/
