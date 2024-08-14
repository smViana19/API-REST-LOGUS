"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Subject = require('../models/Subject'); var _Subject2 = _interopRequireDefault(_Subject);


class SubjectController {
  async store(req, res) {
    try {
      const { user_id, nome } = req.body;
      console.log('Request Body:', req.body);
      const subject = await _Subject2.default.create({ user_id, nome });
      return res.json(subject);
    } catch (e) {
      console.error("Erro ao criar materia: ", e);
      return res.status(400).json({
        errors: ["Erro ao criar materia"],
      })
    }
  }

  async update(req, res) {
    try {
      const subject = await _Subject2.default.findByPk(req.params.id);
      if (!subject) {
        return res.status(400).json({
          errors: ["Tarefa nao existe"],
        });
      }
      const { user_id, nome } = req.body;
      const updatedSubject = await subject.update({ user_id, nome });
      return res.json(updatedSubject);

    } catch (e) {
      console.error("Erro ao editar materia:", e);
      return res.status(400).json({
        errors: ["Erro ao editar materia"]
      })
    }
  }

  async index(req, res) {
    const subject = await _Subject2.default.findAll({
      attributes: ['id', 'nome', 'user_id'],
      order: [
        ["id", "DESC"]
      ]
    });
    res.json(subject);
  }


  async delete(req, res) {
    try {
      const subject = await _Subject2.default.findByPk(req.params.id);
      if (!subject) {
        return res.status(400).json({
          errors: ["Materia nao existe."],
        });
      }
      await subject.destroy();
      return res.json({
        message: ["Deletada com sucesso"],
      });
    } catch (e) {
      console.error("Error excluir a materia:", e);
      return res.status(400).json({
        errors: ["Error ao excluir materia"],
      });
    }
  }
}

exports. default = new SubjectController()