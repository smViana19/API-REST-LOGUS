import SchoolYearGrade from "../models/SchoolYearGrade";
import Grade from "../models/Grade";
import SchoolYear from "../models/SchoolYear";

class SchoolYearGradeController {
  async store(req, res) {
    try {
      const serie = await Grade.findByPk(req.body.serie_id);
      if (!serie) {
        return res.status(400).json({error: 'ID de série inválido.'});
      }

      const schoolYear = await SchoolYear.findByPk(req.body.ano_escolar_id);
      if (!schoolYear) {
        return res.status(400).json({error: 'ID de ano escolar inválido.'});
      }

      const schoolYearGrade = await SchoolYearGrade.create({
        turma: req.body.turma,
        serie_id: req.body.serie_id,
        ano_escolar_id: req.body.ano_escolar_id
      });
      const schoolYearGradeWithAssociations = await SchoolYearGrade.findByPk(schoolYearGrade.id, {
        include: [
          {model: Grade, as: 'serie'},
          {model: SchoolYear, as: 'ano_escolar'}
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
}

export default new SchoolYearGradeController();