import EducationLevel from "../models/EducationLevel";


class EducationLevelController {

  async store(req, res) {
    try {
      const educationLevel = await EducationLevel.create(req.body)
      return res.json(educationLevel)
    } catch (e) {
      console.error("erro: ", e)
      return res.status(400).json({
        status: 400,
        errors: ["Erro ao criar o ano escolar."],
      })
    }
  }

}

export default new EducationLevelController();