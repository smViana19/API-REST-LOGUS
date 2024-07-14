import Task from "../models/Task";

class TaskController {
  async store(req, res) {
    try {
      console.log("Corpo da requisição:", req.body);
      const task = await Task.create(req.body);
      console.log("Tarefa criada:", task);
      return res.json(task);
    } catch (e) {
      console.error("Erro ao criar tarefa:", e);
      return res.status(400).json({
        errors: ["Erro ao criar tarefa"],
      });
    }
  }
}

export default new TaskController();
