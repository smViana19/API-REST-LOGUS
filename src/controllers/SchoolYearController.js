import SchoolYear from "../models/SchoolYear";


class SchoolYearController {
  async store(req, res) {
    try {
      const yearSchool = await SchoolYear.create(req.body)
      return res.json(yearSchool)
    } catch (e) {
      console.error("erro: ", e)
      return res.status(400).json({
        status: 400,
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
        status: 400,
        errors: ["Erro ao listar os anos escolares."]
      })
    }
  }

  async show(req, res) {
    try {
      const yearSchool = await SchoolYear.findByPk(req.params.id);
      if (!yearSchool) {
        return res.status(404).json({error: "Ano escolar nao encontrado."})
      }
      return res.json(yearSchool)
    } catch (error) {
      console.error("Erro ao obter o ano escolar: ", error)
      return res.json({error: "Erro ao obter a serie escolar"})
    }
  }

  async update(req, res) {
    try {
      const yearSchool = await SchoolYear.findByPk(req.params.id);
      if (!yearSchool) {
        return res.status(404).json({error: "Ano escolar nao encontrado."})
      }
      const newYearSchool = await yearSchool.update(req.body);
      return res.json(newYearSchool);

    } catch (error) {
      console.error("Erro ao editar ano escolar: ", error)
      return res.status(400).json({error: "Erro ao editar ano escolar"})
    }
  }

  async delete(req, res) {
    try {
      const yearSchool = await SchoolYear.findByPk(req.params.id);
      if (!yearSchool) {
        return res.status(404).json({error: "Ano escolar nao encontrado."})
      }
      await yearSchool.destroy();
      return res.status(200).json({message: "Deletado com sucesso."})
    } catch (error) {
      console.error("Erro ao excluir ano escolar: ", error)
      return res.json({error: "Erro ao excluir ano escolar"})
    }
  }
}

export default new SchoolYearController();

