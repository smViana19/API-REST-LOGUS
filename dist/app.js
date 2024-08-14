"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _path = require('path');

_dotenv2.default.config();
require('./database');
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);

var _homeRoutes = require('./routes/homeRoutes'); var _homeRoutes2 = _interopRequireDefault(_homeRoutes);
var _userRoutes = require('./routes/userRoutes'); var _userRoutes2 = _interopRequireDefault(_userRoutes);
var _tokenRoutes = require('./routes/tokenRoutes'); var _tokenRoutes2 = _interopRequireDefault(_tokenRoutes);
var _alunoRoutes = require('./routes/alunoRoutes'); var _alunoRoutes2 = _interopRequireDefault(_alunoRoutes);
var _fotoRoutes = require('./routes/fotoRoutes'); var _fotoRoutes2 = _interopRequireDefault(_fotoRoutes);
var _taskRoutes = require('./routes/taskRoutes'); var _taskRoutes2 = _interopRequireDefault(_taskRoutes);
var _subjectRoutes = require('./routes/subjectRoutes'); var _subjectRoutes2 = _interopRequireDefault(_subjectRoutes);
var _subjectMaterialRoutes = require('./routes/subjectMaterialRoutes'); var _subjectMaterialRoutes2 = _interopRequireDefault(_subjectMaterialRoutes);

//PARA UTILIZAR A API
const whiteList = [
  "http://localhost:5174",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5175",
  "http://10.0.2.2:3000",
  "http://localhost:3001"
];

const corOptions = {
  origin: function (origin, callback) {
    //se a URI tiver nas opçoes de whiteList
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
class App {
  constructor() {
    //atributos
    this.App = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.App.use(_cors2.default.call(void 0, corOptions));
    this.App.use(_helmet2.default.call(void 0, ));
    //metodo das middlewares
    this.App.use(_express2.default.urlencoded({ extended: true })); //configuracao do express
    this.App.use(_express2.default.json());
    this.App.use(_express2.default.static(_path.resolve.call(void 0, __dirname, "uploads")));
  }

  routes() {
    //metodo das rotas
    this.App.use("/", _homeRoutes2.default);
    this.App.use("/users/", _userRoutes2.default);
    this.App.use("/tokens/", _tokenRoutes2.default);
    this.App.use("/alunos/", _alunoRoutes2.default);
    this.App.use("/fotos/", _fotoRoutes2.default);
    this.App.use("/tasks/", _taskRoutes2.default);
    this.App.use("/subjects/", _subjectRoutes2.default);
    this.App.use("/subject-materials/", _subjectMaterialRoutes2.default);
  }
}

exports. default = new App().App;
