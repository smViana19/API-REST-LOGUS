import Subject from "../models/Subject";
import Task from "../models/Task";

// eslint-disable-next-line no-unused-vars
class SubjectController {
  async store(req, res) {
    try {
      const subject = await Subject.create(req.body);
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
      const newSubject = await subject.update(req.body);
      const {id, nome} = newSubject;
      return res.json({id, nome});

    } catch (e) {
      console.error("Erro ao editar materia:", e);
      return res.status(400).json({
        errors: ["Erro ao editar materia"]
      })
    }
  }

  async index(req, res) {
    try {
      const subject = await Subject.findAll({
        attributes: ["id", "nome"],
        order: [
          ["id", "DESC"]
        ]
      });
      res.json(subject);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}