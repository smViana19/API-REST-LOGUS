"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);
var _Task = require('../models/Task'); var _Task2 = _interopRequireDefault(_Task);
var _Subject = require('../models/Subject'); var _Subject2 = _interopRequireDefault(_Subject);
var _SubjectMaterial = require('../models/SubjectMaterial'); var _SubjectMaterial2 = _interopRequireDefault(_SubjectMaterial);

//se caso tiver mais model importa e colocar nessa lista
const models = [_Aluno2.default, _User2.default, _Foto2.default, _Task2.default, _Subject2.default, _SubjectMaterial2.default];

const connection = new (0, _sequelize2.default)(_database2.default);

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models),
);
