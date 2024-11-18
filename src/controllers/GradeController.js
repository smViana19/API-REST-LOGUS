import Grade from "../models/Grade";
import Subject from "../models/Subject";
import User from "../models/User";

class GradeController {
  async addGrade(req, res) {
    try {
      const { user_id, subject_id, grade, period } = req.body;
      if (!user_id || !subject_id || !period || grade === undefined) {
        return res.status(400).json({ error: "Os campos 'user_id', 'subject_id', 'period' e 'grade' são obrigatórios." });
      }
      const student = await User.findByPk(user_id);
      const subject = await Subject.findByPk(subject_id);
      if (!student) {
        return res.status(404).json({ error: "Aluno não encontrado." });
      }
      if (!subject) {
        return res.status(404).json({ error: "Disciplina não encontrada." });
      }
      const nota = await Grade.create({ user_id, subject_id, grade, period });
      const notaComMateria = await Grade.findByPk(nota.id, {
        include: [
          {
            model: Subject,
            as: "subject",
            attributes: ["id", "nome"],  // Retorna apenas os campos 'id' e 'nome' da matéria
          },
        ],
      });
      return res.status(201).json(notaComMateria);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao adicionar a nota." });
    }
  }

  async getGradeBySubject(req, res) {
    try {
      const { subject_id } = req.params;
      const notas = await Grade.findAll({
        where: { subject_id },
        include: [{ model: User, as: "student", attributes: ["id", "name"] }],
      });
      if (notas.length === 0) {
        return res.status(404).json({ error: "Nenhuma nota encontrada para esta disciplina." });
      }
      return res.status(200).json(notas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar notas" });
    }
  }

  async getGradesByStudent(req, res) {
    try {
      const { user_id } = req.params;
      const notas = await Grade.findAll({
        where: { user_id },
        include: [
          {
            model: Subject,
            as: "subject",
            attributes: ["id", "nome"],
          },
        ],
      });

      if (notas.length === 0) {
        return res.status(200).json([]); // Retorna um array vazio
      }

      return res.status(200).json(notas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar notas do aluno." });
    }
  }

  async updateGrade(req, res) {
    try {
      const { id } = req.params;
      const { grade } = req.body;
      const nota = await Grade.findByPk(id);
      if (!nota) {
        return res.status(404).json({ error: "Nota não encontrada." });
      }
      nota.grade = grade;
      await nota.save();
      return res.status(200).json(nota);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao editar notas" });
    }
  }

  async deleteGrade(req, res) {
    try {
      const { id } = req.params;
      const nota = await Grade.findByPk(id);

      if (!nota) {
        return res.status(404).json({ error: "Nota não encontrada." });
      }
      await nota.destroy();
      return res.status(200).json({ message: "Nota removida com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao remover a nota." });
    }
  }
}

export default new GradeController();