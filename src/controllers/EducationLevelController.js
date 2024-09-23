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

  async index(req, res) {
    const educationLevels = await EducationLevel.findAll({
      attributes: ["id", "nome", "descricao"],
    });
    return res.json(educationLevels);

  }

  async show(req, res) {
    try {
      const educationLevel = await EducationLevel.findByPk(req.params.id);
      if (!educationLevel) {
        return res.status(404).json({error: "Nivel não encontrado."})
      }
      return res.json(educationLevel)
    } catch (error) {
      console.error("Erro ao obter nivel de educação: ", error)
      return res.json({error: "Erro ao obter nivel de educação"})
    }
  }

  async update(req, res) {
    try {
      const educationLevel = await EducationLevel.findByPk(req.params.id);
      if (!educationLevel) {
        return res.status(404).json({error: "Nivel não encontrado."})
      }
      const {nome, descricao} = req.body
      const newEducationLevel = await educationLevel.update({nome, descricao});
      return res.json({newEducationLevel})

    } catch (error) {
      console.error(error)
      return res.status(400).json({error: "Erro ao editar nivel de educação"})
    }
  }

  async delete(req, res) {
    try {
      const educationLevel = await EducationLevel.findByPk(req.params.id);
      if (!educationLevel) {
        return res.status(404).json({error: "Nivel não encontrado."})
      }

      await educationLevel.destroy();
      return res.json({message: "Deletado com sucesso"})
    } catch (error) {
      console.error("Error excluir o nivel:", error);
      return res.status(400).json({
        error: "Error excluir o nivel",
      });
    }
  }
}

export default new EducationLevelController();