import SchoolYearGrade from "../models/SchoolYearGrade";
import Grade from "../models/Grade";
import SchoolYear from "../models/SchoolYear";
import User from "../models/User";

class SchoolYearGradeController {
  async store(req, res) {
    try {
      const serie = await Grade.findByPk(req.body.serie_id);
      if (!serie) {
        return res.status(400).json({ error: 'ID de série inválido.' });
      }

      const schoolYear = await SchoolYear.findByPk(req.body.ano_escolar_id);
      if (!schoolYear) {
        return res.status(400).json({ error: 'ID de ano escolar inválido.' });
      }

      const user = await User.findByPk(req.body.user_id);
      if (!user) {
        return res.status(404).json({ error: 'ID de usuario inválido' });
      }
      const schoolYearGrade = await SchoolYearGrade.create({
        turma: req.body.turma,
        serie_id: req.body.serie_id,
        ano_escolar_id: req.body.ano_escolar_id,
        user_id: req.body.user_id
      });
      const schoolYearGradeWithAssociations = await SchoolYearGrade.findByPk(schoolYearGrade.id, {
        include: [
          { model: Grade, as: 'serie' },
          { model: SchoolYear, as: 'ano_escolar' },
          { model: User, as: 'user' }
        ]
      });
      return res.json({
        status: 200,
        schoolYearGradeWithAssociations
      });
    } catch (e) {
      console.error("Erro ao criar a turma:", e.message, e.stack);
      return res.status(400).json({
        status: 400,
        errors: "Erro ao criar a turma."
      });
    }
  }

  async index(req, res) {
    try {
      console.log("teste schoolYearGrade", req.body)
      const yearGrade = await SchoolYearGrade.findAll()
      return res.json({
        status: 200,
        yearGrade
      })
    } catch (error) {
      console.error("Não foi possivel sincronizar e listar os dados.", error)
      return res.status(500).json({ error: "Não foi possivel sincronizar e listar os dados." })
    }

  }

  async update(req, res) {
    try {
      const yearGrade = await SchoolYearGrade.findByPk(req.params.id);
      if (!yearGrade) {
        return res.status(400).json({
          errors: ["Turma não encontrada."]
        });
      }
      const newYearGrade = await yearGrade.update(req.body);
      const { id, turma, ano_escolar_id, serie_id } = newYearGrade;
      return res.json({ id, turma, ano_escolar_id, serie_id })
    } catch (e) {
      console.error("Erro ao editar a turma: ", e);
      return res.status(400).json({
        errors: ["Erro ao editar turma"]
      })
    }
  }

  async delete(req, res) {
    try {
      const yearGrade = await SchoolYearGrade.findByPk(req.params.id);
      if (!yearGrade) {
        return res.status(400).json({
          errors: ["Turma não encontrada."]
        });
      }
      await yearGrade.destroy();
      return res.json({
        message: ["Turma deletada com sucesso."]
      })
    } catch (e) {
      console.error("Erro ao excluir turma", e);
      return res.status(400).json({
        errors: ["Erro ao excluir turma"]
      })
    }
  }

}

export default new SchoolYearGradeController();