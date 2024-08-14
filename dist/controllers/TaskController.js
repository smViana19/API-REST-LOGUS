"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Task = require('../models/Task'); var _Task2 = _interopRequireDefault(_Task);

class TaskController {
  async store(req, res) {
    try {
      const task = await _Task2.default.create(req.body);
      const taskWithUser = await _Task2.default.findByPk(task.id, { include: "user" });
      return res.json(taskWithUser);
    } catch (e) {
      console.error("Erro ao criar tarefa:", e);
      return res.status(400).json({
        errors: ["Erro ao criar tarefa"],
      });
    }
  }

  async update(req, res) {
    try {
      const task = await _Task2.default.findByPk(req.params.id);
      if (!task) {
        return res.status(400).json({
          errors: ["Tarefa nao existe."],
        });
      }
      const newTask = await task.update(req.body);
      const { id, titulo, categoria, descricao, urgencia } = newTask;
      return res.json({ id, titulo, categoria, descricao, urgencia });
    } catch (e) {
      console.error("Error editar a tarefa:", e);
      return res.status(400).json({
        errors: ["Error ao editar tarefa"],
      });
    }
  }

  async delete(req, res) {
    try {
      const task = await _Task2.default.findByPk(req.params.id);
      if (!task) {
        return res.status(400).json({
          errors: ["Tarefa nao existe."],
        });
      }
      await task.destroy();
      return res.json({
        message: ["Deletada com sucesso"],
      });
    } catch (e) {
      console.error("Error excluir a tarefa:", e);
      return res.status(400).json({
        errors: ["Error ao excluir tarefa"],
      });
    }
  }
}

exports. default = new TaskController();
