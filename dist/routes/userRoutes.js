"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);
var _roleMiddleware = require('../middlewares/roleMiddleware'); var _roleMiddleware2 = _interopRequireDefault(_roleMiddleware);

const router = new (0, _express.Router)();

router.post("/", _UserController2.default.store);

router.get(
  "/",
  _loginRequired2.default,
  _roleMiddleware2.default.call(void 0, ["diretor"]),
  _UserController2.default.index,
);
router.get(
  "/:id",
  _loginRequired2.default,
  _roleMiddleware2.default.call(void 0, ["diretor"]),
  _UserController2.default.show,
);
router.put("/:id", _loginRequired2.default, _UserController2.default.update);
router.delete(
  "/:id", // Corrigido para aceitar ID na URL
  _loginRequired2.default,
  _roleMiddleware2.default.call(void 0, ["diretor"]),
  _UserController2.default.delete,
);

exports. default = router;

/*
index -> lista todos os usuarios -> GET
store/create -> cria um novo usuario -> POST
delete -> apaga um usuario -> DELETE
show -> mostra um usuario -> GET
update -> atualiza um usuario -> PATCH ou PUT

*/
