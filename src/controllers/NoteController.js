import Note from "../models/Note";
import SchoolYearGrade from "../models/SchoolYearGrade";
import User from "../models/User";
import Subject from "../models/Subject";

class NoteController {

  async store(req, res) {
    try {
      const { anos_series_id, user_id, subject_id, value, trimester } = req.body;
      const subjectExists = await Subject.findByPk(subject_id);
      const userExists = await User.findByPk(user_id);
      if (trimester > 3 || trimester < 1) {
        return res.status(400).json({ error: "Trimestre inválido." });
      }
      if (value < 0) {
        return res.status(400).json({ error: "Valor inválido." })
      }
      if (!subjectExists) {
        return res.status(404).json({ error: "Matéria não encontrada." })
      }
      if (!userExists) {
        return res.status(404).json({ error: "Usuário não encontrado." })
      }
      const note = await Note.create({
        anos_series_id,
        user_id,
        subject_id,
        value,
        trimester,
      });
      const noteWithAssociations = await Note.findByPk(note.id, {
        include: [
          {
            model: SchoolYearGrade,
            as: 'turma',
            attributes: ['id', 'turma'],
          },
          {
            model: User,
            as: 'user',
            attributes: ['id', 'nome'],
          },
          {
            model: Subject,
            as: 'subject',
            attributes: ['id', 'nome']
          }
        ]
      });
      return res.json(noteWithAssociations);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar a nota." });
    }
  }
  async index(req, res) {
    try {
      const notes = await Note.findAll({
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'nome']
          },
          {
            model: Subject,
            as: 'subject',
            attributes: ['nome']
          },
          {
            model: SchoolYearGrade,
            as: 'turma',
            attributes: ['turma'],
          },
        ]
      })
      return res.status(200).json(notes)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao listar as notas." })
    }
  }
  async show() { }
  async update() { }
  async delete() { }

}

export default new NoteController();