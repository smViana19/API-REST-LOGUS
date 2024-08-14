"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _TaskController = require('../controllers/TaskController'); var _TaskController2 = _interopRequireDefault(_TaskController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);
var _roleMiddleware = require('../middlewares/roleMiddleware'); var _roleMiddleware2 = _interopRequireDefault(_roleMiddleware);

const router = new (0, _express.Router)();

router.post("/", _loginRequired2.default, _roleMiddleware2.default.call(void 0, "estudante"), _TaskController2.default.store);
router.put("/:id", _loginRequired2.default, _roleMiddleware2.default.call(void 0, "estudante"), _TaskController2.default.update);
router.delete("/:id", _loginRequired2.default, _roleMiddleware2.default.call(void 0, "estudante"), _TaskController2.default.delete);
exports. default = router;
