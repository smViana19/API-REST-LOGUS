import Note from "../models/Note";
import SchoolYearGrade from "../models/SchoolYearGrade";
import User from "../models/User";
import Subject from "../models/Subject";
import Period from "../models/Period";

class NoteController {

  async createNote(req, res) {
    try {
      const { anos_series_id, user_id, subject_id, value, period_id } = req.body;
      const subjectExists = await Subject.findByPk(subject_id);
      const userExists = await User.findByPk(user_id);
      const periodExists = await Period.findByPk(period_id)
      if (value < 0) {
        return res.status(400).json({ error: "Valor inválido." })
      }
      if (!subjectExists) {
        return res.status(404).json({ error: "Matéria não encontrada." })
      }
      if (!userExists) {
        return res.status(404).json({ error: "Usuário não encontrado." })
      }
      if (!periodExists) {
        return res.status(404).json({ error: "Periodo não encontrado." })
      }

      const note = await Note.create({
        anos_series_id,
        user_id,
        subject_id,
        value,
        period_id
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
          },
          {
            model: Period,
            as: 'period',
            attributes: ['name']
          }
        ]
      });
      return res.json(noteWithAssociations);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar a nota." });
    }
  }
  async getAllNotes(req, res) {
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
          {
            model: Period,
            as: 'period',
            attributes: ['name']
          }
        ]
      })
      return res.status(200).json(notes)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao listar as notas." })
    }
  }
  async getNoteById(req, res) {
    try {
      const note = await Note.findByPk(req.params.id, {
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
          {
            model: Period,
            as: 'period',
            attributes: ['name']
          }
        ]
      });
      if (!note) {
        return res.status(404).json({ error: "Nota não encontrada" });
      }
      res.status(200).json(note)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao buscar nota, tente novamente" });
    }
  }
  async updateNote(req, res) {
    try {
      const note = await Note.findByPk(req.params.id);
      if (!note) {
        return res.status(404).json({ error: "Nota não encontrada" });
      }
      const { value, period_id, user_id, anos_series_id, subject_id } = req.body;
      const newNotes = await note.update({ value, period_id, user_id, anos_series_id, subject_id })
      res.status(200).json(newNotes);
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao editar nota, tente novamente" });
    }
  }
  async deleteNote(req, res) {
    try {
      const note = await Note.findByPk(req.params.id);
      if (!note) {
        return res.status(404).json({ error: "Nota não encontrada" });
      }
      await note.destroy();
      return res.status(204);
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao deletar nota, tente novamente" });
    }
  }

}

export default new NoteController();