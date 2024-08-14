"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

class TokenController {
  async store(req, res) {
    const { email = "", password = "" } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: 401,
        errors: ["Credenciais inválidas!"],
      });
    }
    const user = await _User2.default.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        status: 401,
        errors: ["Usuário nao existe!"],
      });
    }

    if (!(await user.passwordValida(password))) {
      return res.status(401).json({
        status: 401,
        errors: ["Senha inválida"],
      });
    }

    const { id, role } = user;
    const token = _jsonwebtoken2.default.sign({ id, email, role }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return res.json({
      status: 200,
      token,
      user: { nome: user.nome, id, email, role },
    });
  }
}

exports. default = new TokenController();
