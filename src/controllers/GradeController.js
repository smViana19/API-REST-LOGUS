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

  async show(req, res) {
    try {
      const grade = await Grade.findByPk(req.params.id);
      if (!grade) {
        return res.status(404).json({error: "Série não encontrada."})
      }
      return res.json(grade)

    } catch (error) {
      console.error("Erro ao obter a serie escolar: ", error)
      return res.json({error: "Erro ao obter a serie escolar"})
    }
  }

  async update(req, res) {
    try {
      const grade = await Grade.findByPk(req.params.id);
      if (!grade) {
        return res.status(404).json({error: "Serie não encontrada."})
      }
      const {nome, descricao} = req.body
      const newGrade = await grade.update(nome, descricao);
      return res.json(newGrade);

    } catch (error) {
      console.error("Erro ao editar a serie escolar: ", error)
      return res.status(400).json({error: "Erro ao editar a serie escolar"})
    }
  }

  async delete(req, res) {
    //TODO IMPLEMENTAR ONCASCADE NAS TABELAS
    try {
      const grade = await Grade.findByPk(req.params.id);
      if (!grade) {
        return res.status(404).json({error: "Serie não encontrada."})
      }
      await grade.destroy();
      return res.json({message: "Deletado com sucesso"})
    } catch (error) {
      console.error("Error a serie escolar:", error);
      return res.status(400).json({
        error: "Error ao excluir a serie escolar",
      });
    }
  }

}

export default new GradeController();