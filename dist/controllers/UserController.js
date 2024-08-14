"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable no-unused-vars */
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async store(req, res) {
    try {
      const novoUser = await _User2.default.create(req.body);
      const { id, nome, email, role } = novoUser;
      return res.json({ id, nome, email, role }); //adicionado role
    } catch (e) {
      return res.status(400).json({
        errors: ["deu erro"],
      });
    }
  }

  // Index
  // async index(req, res) {
  //   try {
  //     const users = await User.findAll({
  //       attributes: ["id", "nome", "email", "role"],
  //     });
  //     return res.json(users);
  //   } catch (e) {
  //     return res.json(null);
  //   }
  // }

  // Show
  async index(req, res) {
    try {
      const users = await _User2.default.findAll({
        attributes: ["id", "nome", "email", "role"],
      });
      console.log("Usuários encontrados:", users); // Adicionando log para depuração
      return res.json(users);
    } catch (e) {
      console.error("Erro ao listar usuários:", e); // Adicionando log para depuração
      return res.status(500).json({
        errors: ["Erro ao listar usuários."],
      });
    }
  }

  async show(req, res) {
    try {
      const user = await _User2.default.findByPk(req.params.id);
      const { id, nome, email, role } = user;
      return res.json({ id, nome, email, role });
    } catch (e) {
      return res.json(null);
    }
  }
  // Update
  async update(req, res) {
    try {
      const user = await _User2.default.findByPk(req.params.id);
      if (!user) {
        return res.status(400).json({
          errors: ["Usuario nao existe."],
        });
      }

      const novosDados = await user.update(req.body);
      const { id, nome, email, role } = novosDados;
      return res.json({ id, nome, email, role });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Delete
  async delete(req, res) {
    try {
      const user = await _User2.default.findByPk(req.params.id);
      if (!user) {
        return res.status(400).json({
          errors: ["Usuario nao existe."],
        });
      }

      await user.destroy();
      return res.json(null);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}
exports. default = new UserController();
