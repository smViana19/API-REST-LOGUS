import Class from "../models/Class";
import ClassStudents from "../models/ClassStudents";
import User from "../models/User";

class ClassStudentsController {
  async addStudentToClass(req, res) {
    try {
      const { user_id, class_id } = req.body;
      if (!user_id || !class_id) {
        return res.status(400).json({ error: "Os campos são obrigatorios" });
      }
      const turma = await Class.findByPk(class_id);
      const usuario = await User.findByPk(user_id);
      if (!turma) {
        return res.status(404).json({ error: "Turma não encontrada." });
      }

      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      const association = await ClassStudents.create({ user_id, class_id });
      return res.status(201).json(association);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao associar aluno à turma." });
    }
  }
  async getStudentByClass(req, res) {
    try {
      const { class_id } = req.params;
      const turma = await Class.findByPk(class_id, {
        include: [{ model: User, as: "students" }],
      });
      if (!turma) {
        return res.status(404).json({ error: "Turma não encontrada." });
      }

      return res.status(200).json(turma.students);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao listar alunos da turma." });
    }
  }
  async removeStudentFromClass(req, res) {
    try {
      const { user_id, class_id } = req.body;
      const association = await ClassStudents.findOne({ where: { user_id, class_id } });
      if (!association) {
        return res.status(404).json({ error: "Associação não encontrada." });
      }
      await association.destroy();
      return res.status(200).json({ message: "Aluno removido da turma com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao remover aluno da turma." });
    }
  }
}
export default new ClassStudentsController();