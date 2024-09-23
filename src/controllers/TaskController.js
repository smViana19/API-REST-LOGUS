import Task from "../models/Task";

class TaskController {
  async store(req, res) {
    try {
      const task = await Task.create({
        ...req.body,
        user_id: req.userId, // Usa o userId do middleware
      });
      const taskWithUser = await Task.findByPk(task.id, {include: "user"});
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
      const task = await Task.findByPk(req.params.id);
      if (!task) {
        return res.status(400).json({
          errors: ["Tarefa nao existe."],
        });
      }
      const newTask = await task.update(req.body);
      const {id, titulo, categoria, descricao, urgencia} = newTask;
      return res.json({id, titulo, categoria, descricao, urgencia});
    } catch (e) {
      console.error("Error editar a tarefa:", e);
      return res.status(400).json({
        errors: ["Error ao editar tarefa"],
      });
    }
  }

  async index(req, res) {
  }

  async show(req, res) {
  }

  async delete(req, res) {
    try {
      const task = await Task.findByPk(req.params.id);
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

export default new TaskController();
