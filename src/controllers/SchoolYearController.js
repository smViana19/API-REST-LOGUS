import SchoolYear from "../models/SchoolYear";


class SchoolYearController {
  async store(req, res) {
    try {
      const yearSchool = await SchoolYear.create(req.body)
      return res.json(yearSchool)
    } catch (e) {
      console.error("erro: ", e)
      return res.status(400).json({
        errors: ["Erro ao criar o ano escolar."],
      })
    }
  }

  async index(req, res) {
    try {
      const yearSchool = await SchoolYear.findAll({
        order: [
          ["id", "ASC"]
        ]
      });
      res.json(yearSchool)
    } catch (e) {
      console.error("erro: ", e)
      return res.status(400).json({
        errors: ["Erro ao listar os anos escolares."]
      })
    }
  }
}

export default new SchoolYearController();