"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _SubjectController = require('../controllers/SubjectController'); var _SubjectController2 = _interopRequireDefault(_SubjectController);

var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);
var _roleMiddleware = require('../middlewares/roleMiddleware'); var _roleMiddleware2 = _interopRequireDefault(_roleMiddleware);

const router = new _express.Router;

router.get('/', _SubjectController2.default.index);
router.post('/', _loginRequired2.default, _roleMiddleware2.default.call(void 0, ["professor", "diretor"]), _SubjectController2.default.store);
router.put('/:id', _loginRequired2.default, _roleMiddleware2.default.call(void 0, ["professor", "diretor"]), _SubjectController2.default.update);
router.delete('/:id', _loginRequired2.default, _roleMiddleware2.default.call(void 0, ["professor","diretor"]), _SubjectController2.default.delete);

exports. default = router;