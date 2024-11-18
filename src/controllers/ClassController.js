import Class from "../models/Class";

class ClassController {
  async createClass(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ error: "O campo 'name' é obrigatório." });
      }
      const turma = await Class.create({ name });
      return res.status(201).json(turma);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar a turma" });
    }
  }
  async getAllClasses(req, res) {
    try {
      const turmas = await Class.findAll();

      return res.status(200).json(turmas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar as turmas." });
    }
  }
  async getClassById(req, res) {
    try {
      const { id } = req.params;
      const turma = await Class.findByPk(id);
      if (!turma) {
        return res.status(404).json({ error: "Turma não encontrada." });
      }
      return res.status(200).json(turma);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar a turma." });
    }
  }
  async updateClass(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const turma = await Class.findByPk(id);

      if (!turma) {
        return res.status(404).json({ error: "Turma não encontrada." });
      }
      turma.name = name || turma.name;
      await turma.save();
      return res.status(200).json(turma);
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao editar a turma" });
    }
  }
  async deleteClass(req, res) {
    try {
      const { id } = req.params;

      const turma = await Class.findByPk(id);

      if (!turma) {
        return res.status(404).json({ error: "Turma não encontrada." });
      }

      await turma.destroy();

      return res.status(200).json({ message: "Turma excluída com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao excluir a turma." });
    }
  }

}
export default new ClassController();