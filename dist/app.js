"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _path = require('path');


_dotenv2.default.config();
require('./database');
var _express = require('express'); var _express2 = _interopRequireDefault(_express);


var _homeRoutes = require('./routes/homeRoutes'); var _homeRoutes2 = _interopRequireDefault(_homeRoutes);
var _userRoutes = require('./routes/userRoutes'); var _userRoutes2 = _interopRequireDefault(_userRoutes);
var _tokenRoutes = require('./routes/tokenRoutes'); var _tokenRoutes2 = _interopRequireDefault(_tokenRoutes);
var _alunoRoutes = require('./routes/alunoRoutes'); var _alunoRoutes2 = _interopRequireDefault(_alunoRoutes);
var _fotoRoutes = require('./routes/fotoRoutes'); var _fotoRoutes2 = _interopRequireDefault(_fotoRoutes);


class App {
  constructor() {
    //atributos
    this.App = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    //metodo das middlewares
    this.App.use(_express2.default.urlencoded({ extended: true })); //configuracao do express
    this.App.use(_express2.default.json());
    this.App.use(_express2.default.static(_path.resolve.call(void 0, __dirname, 'uploads')));
  }

  routes() {
    //metodo das rotas
    this.App.use('/', _homeRoutes2.default);
    this.App.use('/users/', _userRoutes2.default);
    this.App.use('/tokens/', _tokenRoutes2.default);
    this.App.use('/alunos/', _alunoRoutes2.default);
    this.App.use('/fotos/', _fotoRoutes2.default);

  }
}

exports. default = new App().App;
