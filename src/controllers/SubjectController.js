import Subject from "../models/Subject";


class SubjectController {
  async store(req, res) {
    try {
      console.log('Request Body:', req.body);
      const subject = await Subject.create({
        ...req.body,
        user_id: req.userId, // Usa o userId do middleware
      });
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
      const subject = await Subject.findByPk(req.params.id);
      if (!subject) {
        return res.status(400).json({
          errors: ["Tarefa nao existe"],
        });
      }
      const { nome } = req.body;
      const updatedSubject = await subject.update({nome });
      return res.json(updatedSubject);

    } catch (e) {
      console.error("Erro ao editar materia:", e);
      return res.status(400).json({
        errors: ["Erro ao editar materia"]
      })
    }
  }

  async index(req, res) {
    const subject = await Subject.findAll({
      attributes: ['id', 'nome', 'user_id'],
      order: [
        ["id", "ASC"]
      ]
    });
    res.json(subject);
  }

  async show(req, res) {
    try {
      const subject = await Subject.findByPk(req.params.id);
      if (!subject) {
        return res.status(404).json({
          errors: ["Matéria não encontrada."],
        });
      }
      return res.json(subject);
    } catch (e) {
      console.error("Erro ao obter matéria:", e);
      return res.status(400).json({
        errors: ["Erro ao obter matéria"],
      });
    }
  }

  async delete(req, res) {
    try {
      const subject = await Subject.findByPk(req.params.id);
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

export default new SubjectController()