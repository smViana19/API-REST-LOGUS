import Grade from "../models/Grade";

class GradeController {
  async store(req, res) {
    try {
      const {educationLevelId, ...rest} = req.body;
      const grade = await Grade.create({
        ...rest,
        educationLevelId
      });
      const gradeWithAssociations = await Grade.findByPk(grade.id, {
        include: ["niveis_escolares"]
      });

      console.log('Request Body:', req.body);
      return res.json(gradeWithAssociations)
    } catch (e) {
      console.error("erro: ", e)
      return res.status(400).json({
        status: 400,
        errors: ["Erro ao criar a serie."],
      });

    }
  }
  async index(req, res) {
    const grade = await Grade.findAll()
    return res.json({
      status: 200,
      grade
    })
  }

}

export default new GradeController();